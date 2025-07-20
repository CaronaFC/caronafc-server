import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoService } from '../../../src/modules/pagamento/service/pagamento.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { CriarPagamentoDto } from '../../../src/modules/pagamento/dto/criarPagamento.dto';
import { IdentificationType } from 'mercadopago';
// Mock da resposta do SDK
jest.mock('mercadopago', () => {
  const actual = jest.requireActual('mercadopago');

  return {
    ...actual,
    Payment: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValue({

        id: '123456',
        status: 'pending',
        point_of_interaction: {
          transaction_data: {
            qr_code: '00020126360014...',
            qr_code_base64: 'data:image/png;base64,ABC123==',
          },
        },
        external_reference: 'ref_123',
        description: 'Teste com Jest',
        transaction_amount: 50.5,

      }),
    })),
  };
});

describe('Teste de conexão Mercado Pago', () => {
  it('deve autenticar com sucesso usando o access_token de teste', async () => {
    const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-3116153447679526-070717-8c803268ac25ab8108567c3bcb2d595d-489252081' });

    const identificationType = new IdentificationType(mp);
    const response = await identificationType.list();

    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
  });
});

describe('PagamentoService', () => {
  let service: PagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoService,
        {
          provide: 'MERCADO_PAGO',
          useValue: new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-3116153447679526-070717-8c803268ac25ab8108567c3bcb2d595d-489252081' }),
        },
      ],
    }).compile();

    service = module.get<PagamentoService>(PagamentoService);
  });

  it('deve criar um pagamento PIX e retornar os dados corretamente', async () => {
    const dto: CriarPagamentoDto = {
      amount: 50.5,
      description: 'Teste com Jest',
      email: 'cliente@email.com',
      method_payment_id: 'pix', // Método de pagamento PIX
      binary_mode: true, // Modo binário
    };

    const result = await service.createPixPayment(dto);

    expect(result).toEqual({
      id: '123456',
      status: 'pending',
      qr_code: '00020126360014...',
      qr_code_base64: 'data:image/png;base64,ABC123==',
      external_reference: 'ref_123',
      description: 'Teste com Jest',
      transaction_amount: 50.5,
    });
  });
});