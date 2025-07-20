import { Body, Controller, Post } from '@nestjs/common';
import { PagamentoService } from '../service/pagamento.service';
import { CriarPagamentoDto } from '../dto/criarPagamento.dto';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('pix')
  async criarPagamentoPix(@Body() dto: CriarPagamentoDto) {
    return await this.pagamentoService.createPixPayment(dto);
  }
}
