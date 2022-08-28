import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers : [
    PokemonController
  ],
  providers   : [
    PokemonService
  ],
  imports     : [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name  : Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class PokemonModule {}
