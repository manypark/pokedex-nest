import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel:Model<Pokemon>,
  ) {}

  /** 
   * Creacion de un pokemon
    @param createPokemonDto DTO del objeto de pokemon a guardar 
  */
  async create( createPokemonDto: CreatePokemonDto ) {
    try {
      return await this.pokemonModel.create( createPokemonDto );
    } catch (error) {
      this.hanldeExeption(error);
    }
  }

  /** 
   * Regresa una lista de todos los pokemons
  */
  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 }).select('-__v');
  }

  /** 
   * Funcion que valida por id, idmongo y name la busqueda de un pokemon
   * @param term el termino de busqueda del pokemon
  */
  async findOne( term: string ) {

    let pokemon:Pokemon;

    //Busqueda por Id
    if( !isNaN(+term) ) pokemon = await this.pokemonModel.findOne( { no: term } );

    //Busqueda por Mongo id
    if( isValidObjectId( term ) ) pokemon = await this.pokemonModel.findById( term );

    //Busqueda por Name id
    if( !pokemon ) pokemon = await this.pokemonModel.findOne( { name: term.trim() } );

    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or ${term} not found`);
    
    return pokemon;
  }

  /** 
   * Funcion que valida por id, idmongo y name la busqueda de un pokemon
   * @param term termino para actualizar el pokemon
   * @dto updatePokemonDto dto para actualizar el pokemon
  */
  async update( term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );

    try {
      await pokemon.updateOne( updatePokemonDto, { new: true } );
    } catch (error) {
      this.hanldeExeption(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  /**
   * Eliminar un pokemon
   */
  async remove( idPokemon:string ) {
    // const pokemon = await this.findOne(term);
    // return await this.pokemonModel.deleteOne();
    // return await this.pokemonModel.findByIdAndDelete( idPokemon );

    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id: idPokemon });
    if( deletedCount === 0) throw new BadRequestException(`Pokemon with ${idPokemon} not found`);
    
    return;
  }

  /**
   * Funcion para procesar un error controlado de mongo
   */
  private hanldeExeption( error:any ) {

    if( error.code === 11000 ) {
      throw new BadRequestException(`Pokemons exists in db ${JSON.stringify(error.keyValue) } `);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Check server log`);
  }

}
