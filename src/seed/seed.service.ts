import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/interfaces';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel:Model<Pokemon>,
  ){}
  
  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert : { name:string, no:number }[] = [];

    data.results.forEach( async ({ name , url }) => {

      const segments  = url.split('/');
      const no = +segments[ segments.length - 2 ];
      // const pokemon = await this.pokemonModel.create({ name, no });

      pokemonToInsert.push({ name, no });
    });
    
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

}
