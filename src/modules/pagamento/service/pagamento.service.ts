import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IdentificationType,
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
} from 'mercadopago';
import { CriarPagamentoDto } from '../dto/criarPagamento.dto';

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
      qr_code_base64:
        response.point_of_interaction?.transaction_data?.qr_code_base64,
      external_reference: response.external_reference,
      description: response.description,
      transaction_amount: response.transaction_amount,
    };
  }

  async testarConexao(): Promise<boolean> {
    try {
      const identificationType = new IdentificationType(this.mercadoPagoConfig);
      const response = await identificationType.list();
      console.log('Conexão com Mercado Pago bem-sucedida:', response);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Erro ao conectar com Mercado Pago');
      return false;
    }
  }

  async UpdatePaymentStatus(
    paymentId: string,
    status: string,
  ): Promise<string> {
    const paymentMethod = new PaymentMethod(this.mercadoPagoConfig);
    const response = await paymentMethod.get();
    if (paymentId == null || paymentId == undefined) {
      throw new UnauthorizedException('Erro ao localizar o Id do pagamento');
    }
    response.forEach((payment) => {
      if (payment.id === paymentId) {
        payment.status = status;
      }
    });
    return 'Payment status updated successfully';
  }

  async getPaymentMethods(): Promise<any> {
    const listPayments = new IdentificationType(this.mercadoPagoConfig);
    const response = await listPayments.list();
    return response;
  }

  async getPaymentById(paymentId: string): Promise<any> {
    const payment = new Payment(this.mercadoPagoConfig);
    if (!paymentId) {
      throw new UnauthorizedException('Payment ID is required');
    }
    const response = await payment.get({ id: paymentId });
    if (!response) {
      throw new UnauthorizedException('Payment not found');
    }
    return {
      id: response.id,
      status: response.status,
      transaction_amount: response.transaction_amount,
      description: response.description,
      payer_email: response.payer?.email,
      payment_method_id: response.payment_method_id,
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64:
        response.point_of_interaction?.transaction_data?.qr_code_base64,
    };
  }

  async cancelPayment(paymentId: string): Promise<string> {
    const payment = new Payment(this.mercadoPagoConfig);
    if (!paymentId) {
      throw new UnauthorizedException('Payment ID is required');
    }
    const response = await payment.cancel({ id: paymentId });
    if (!response) {
      throw new UnauthorizedException('Payment not found');
    }
    return 'Payment deleted successfully';
  }
}
