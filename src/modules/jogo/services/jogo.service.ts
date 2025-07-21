import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JogoService {
<<<<<<< HEAD
  // Implementação dos métodos do serviço de Jogo
  // Exemplo: listarJogos
  // Esses métodos irão interagir com uma api que irá buscar os dados de jogos.

  async listarJogos() {
    const filePath = path.resolve(
      process.cwd(),
      'football_data/filtered_matches.json',
    );
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jogos = JSON.parse(rawData);
    return jogos;
  }

  async buscarTimePorId(id: number): Promise<any> {
    // Aqui você implementaria a lógica para buscar um time específico por ID
    try {
      const response = await fetch(
        `https://api.soccerdataapi.com/team/?team_id=${id}auth_token=bcaa4c172d7604813d797d51aad6decc7d623cfd`,
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar jogo');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar jogo por ID:', error);
      return null;
    }
  }
=======
    // Implementação dos métodos do serviço de Jogo
    // Exemplo: listarJogos
    // Esses métodos irão interagir com uma api que irá buscar os dados de jogos.

    async listarJogos() {
        const filePath = path.resolve(process.cwd(), 'filtered_matches.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const jogos = JSON.parse(rawData);
        return jogos;
    }

    async buscarTimePorId(id: number): Promise<any> {
        // Aqui você implementaria a lógica para buscar um time específico por ID
        try {
            const response = await fetch(`https://api.soccerdataapi.com/team/?team_id=${id}auth_token=bcaa4c172d7604813d797d51aad6decc7d623cfd`);
            if (!response.ok) {
                throw new Error('Erro ao buscar jogo');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar jogo por ID:', error);
            return null;
        }
    }
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
}
