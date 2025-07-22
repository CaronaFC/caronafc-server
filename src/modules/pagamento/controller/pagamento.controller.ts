import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CriarPagamentoDto } from '../dto/criarPagamento.dto';
import { PagamentoService } from '../service/pagamento.service';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('pix')
  async criarPagamentoPix(@Body() dto: CriarPagamentoDto) {
    return await this.pagamentoService.createPixPayment(dto);
  }

  @Get('id')
  async getById(@Body('id') id: string) {
    return await this.pagamentoService.getPaymentById(id);
  }

  @Get('id')
  async getStatusById(@Body('id') id: string, status: string) {
    return await this.pagamentoService.UpdatePaymentStatus(id, status);
  }

  @Delete('id')
  async deletePagamento(@Body('id') id: string) {
    return await this.pagamentoService.cancelPayment(id);
  }
}
