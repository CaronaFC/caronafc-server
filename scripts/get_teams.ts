const fs = require('fs');

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

const rawData = fs.readFileSync('filtered_matches.json', 'utf-8');
const matches: Match[] = JSON.parse(rawData);

const teamsMap = new Map<number, Team>();

matches.forEach(({ teams: { home, away } }) => {
  teamsMap.set(home.id, home);
  teamsMap.set(away.id, away);
});

const uniqueTeams = Array.from(teamsMap.values());

// Salva em teams.json
fs.writeFileSync('teams.json', JSON.stringify(uniqueTeams, null, 2));

console.log(`Gerado teams.json com ${uniqueTeams.length} times únicos.`);
