import { Injectable } from '@nestjs/common';


@Injectable()
export class JogoService {
    // Implementação dos métodos do serviço de Jogo
    // Exemplo: listarJogos
    // Esses métodos irão interagir com uma api que irá buscar os dados de jogos.
    
    async listarJogos(): Promise<any[]> {
        // Aqui você implementaria a lógica para buscar os jogos
        //  chamda de API localhost:3000/matches
        try {
            const response = await fetch('https://api.soccerdataapi.com/matches/?league_id=215&auth_token=bcaa4c172d7604813d797d51aad6decc7d623cfd');
            if (!response.ok) {
                throw new Error('Erro ao buscar jogos');
            }
            // verificar se a data do jogo é menor que a data atual
            const jogos = await response.json();
            const dataAtual = new Date();
            const jogosFiltrados = jogos.filter(jogo => new Date(jogo.horario) > dataAtual);
            // ordenar os jogos pela data do jogo
            return jogosFiltrados;
        } catch (error) {
            console.error('Erro ao listar jogos:', error);
            return [];
        }
    }
}
