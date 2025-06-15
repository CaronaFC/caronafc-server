import { Controller } from '@nestjs/common';
import { JogoService } from '../service/jogo.service';

@Controller('jogo')
export class JogoController {
    constructor(private readonly jogoService: JogoService){}
}
