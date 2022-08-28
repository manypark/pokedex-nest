import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
    }),
    MongooseModule.forRoot(env.MONGO_DB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})

export class AppModule {}
