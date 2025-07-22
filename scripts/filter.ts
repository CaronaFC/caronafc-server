import * as fs from 'fs';

interface Team {
  id: number;
  name: string;
}

interface Match {
  id: number;
  date: string;
  time: string;
  teams: {
    home: Team;
    away: Team;
  };
}

interface Stage {
  matches: Match[];
}

interface LeagueData {
  stage: Stage[];
}

// Lê o arquivo all_matches.json
const rawData = fs.readFileSync('scripts/all_matches.json', 'utf-8');
const allLeagues: LeagueData[] = JSON.parse(rawData);

// Array onde vamos colocar os dados filtrados
const filteredMatches: Match[] = [];

function parseDateBR(dateStr: string): Date {
  // Espera "dd/MM/yyyy"
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const maxDate = addMonths(today, 2);

allLeagues.forEach((league) => {
  league.stage.forEach((stage) => {
    stage.matches.forEach((match) => {
      const matchDate = parseDateBR(match.date);

      if (matchDate >= today && matchDate <= maxDate) {
        filteredMatches.push({
          id: match.id,
          date: match.date,
          time: match.time,
          teams: {
            home: {
              id: match.teams.home.id,
              name: match.teams.home.name,
            },
            away: {
              id: match.teams.away.id,
              name: match.teams.away.name,
            },
          },
        });
      }
    });
  });
});

// Salva os dados filtrados em um novo arquivo
fs.writeFileSync(
  'filtered_matches.json',
  JSON.stringify(filteredMatches, null, 2),
);

console.log('Dados filtrados salvos em filtered_matches.json');
