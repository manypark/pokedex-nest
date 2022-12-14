import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load            : [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),
    MongooseModule.forRoot( process.env.MONGODB ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})

export class AppModule {}
