import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CriarPagamentoDto } from '../dto/criarPagamento.dto';
import { Payment, MercadoPagoConfig, IdentificationType } from 'mercadopago';

@Injectable()
export class PagamentoService {
  constructor(
    @Inject('MERCADO_PAGO')
    private readonly mercadoPagoConfig: MercadoPagoConfig,
  ) {}

  async createPixPayment(dto: CriarPagamentoDto) {
    const payment = new Payment(this.mercadoPagoConfig);

    const response = await payment.create({
      body: {
        transaction_amount: dto.amount,
        description: dto.description,
        payment_method_id: dto.method_payment_id,
        payer: {
          email: dto.email,
        },
        binary_mode: dto.binary_mode,
      },
    });

    return {
      id: response.id,
      status: response.status,
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      external_reference: response.external_reference,
      description: response.description,
      transaction_amount: response.transaction_amount,
    };
  }

  async testarConexao(): Promise<boolean> {
    try{
      const identificationType = new IdentificationType(this.mercadoPagoConfig);
      const response = await identificationType.list();
      console.log('Conexão com Mercado Pago bem-sucedida:', response);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Erro ao conectar com Mercado Pago');
      return false;
    }
  }
}
