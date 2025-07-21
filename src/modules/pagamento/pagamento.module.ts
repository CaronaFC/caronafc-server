import { Module } from '@nestjs/common';
import { PagamentoService } from './service/pagamento.service';
import { PagamentoController } from './controller/pagamento.controller';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
