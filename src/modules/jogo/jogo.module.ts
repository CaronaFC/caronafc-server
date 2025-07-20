import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogoController } from './controller/jogo.controller';
import { Jogo } from './jogo.entity';
import { JogoService } from './services/jogo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo])],
  controllers: [JogoController],
  providers: [JogoService]
})
export class JogoModule {}
