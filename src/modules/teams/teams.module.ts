import { Module } from '@nestjs/common';
import { TeamsService } from './services/teams.service';
import { TeamsController } from './controller/teams.controller';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
