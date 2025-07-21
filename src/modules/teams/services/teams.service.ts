import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type Team = {
  id: number;
  name: string;
};

type Match = {
  id: number;
  date: string;
  time: string;
  teams: {
    home: Team;
    away: Team;
  };
};

@Injectable()
export class TeamsService {
  private readonly teamsPath = path.join(
    process.cwd(),
    'football_data/teams.json',
  );
  getAllTeams(): Team[] {
    const data = fs.readFileSync(this.teamsPath, 'utf-8');
    const teams: Team[] = JSON.parse(data);

    return teams;
  }
}
