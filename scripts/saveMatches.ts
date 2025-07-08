import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const leagueIds = [215, 216, 217]; // IDs das ligas desejadas
const authToken = '164cfdcabe5f0a55f414a950e3c1d657f9959503';

async function fetchMatchesForLeague(leagueId: number) {
    const url = `https://api.soccerdataapi.com/matches/?league_id=${leagueId}&auth_token=${authToken}`;
    try {
        const response = await axios.get(url);
        const matches = Array.isArray(response.data) ? response.data : response.data.matches;
        return Array.isArray(matches) ? matches : [];
    } catch (error: any) {
        console.error(`Erro ao buscar liga ${leagueId}:`, error.message);
        return [];
    }
}

async function fetchAndSaveAllMatches() {
    const allMatches: any[] = [];

    for (const leagueId of leagueIds) {
        console.log(`Buscando partidas da liga ${leagueId}...`);
        const matches = await fetchMatchesForLeague(leagueId);
        allMatches.push(...matches);
    }

    const filePath = path.resolve(__dirname, 'all_matches.json');
    fs.writeFileSync(filePath, JSON.stringify(allMatches, null, 2));

    console.log(`${allMatches.length} partidas salvas em ${filePath}`);
}

fetchAndSaveAllMatches();
