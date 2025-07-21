import { Module } from '@nestjs/common';
import { MercadoPagoProvider } from './config/mercadopago';

@Module({
  providers: [MercadoPagoProvider],
  exports: [MercadoPagoProvider],
})
export class MercadopagoModule {}
