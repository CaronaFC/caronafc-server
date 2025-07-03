import { Controller } from '@nestjs/common';
import { JogoService } from '../services/jogo.service';

@Controller('jogo')
export class JogoController {
    constructor(private readonly jogoService: JogoService){}

    // Aqui você pode definir os endpoints do controlador de Jogo
    // Exemplo: listarJogos
    // @Get('listar')
    async listarJogos() {
        return this.jogoService.listarJogos();
    }
}
