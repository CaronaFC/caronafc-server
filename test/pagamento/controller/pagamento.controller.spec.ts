import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from '../../../src/modules/pagamento/controller/pagamento.controller';
import { PagamentoService } from '../../../src/modules/pagamento/service/pagamento.service';
import { CriarPagamentoDto } from '../../../src/modules/pagamento/dto/criarPagamento.dto';

describe('PagamentoController', () => {
  let controller: PagamentoController;
  let service: PagamentoService;

  const mockPagamentoService = {
    createPixPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [
        {
          provide: PagamentoService,
          useValue: mockPagamentoService,
        },
      ],
    }).compile();

    controller = module.get<PagamentoController>(PagamentoController);
    service = module.get<PagamentoService>(PagamentoService);
  });

  it('deve chamar createPixPayment() e retornar os dados do pagamento', async () => {
    const dto: CriarPagamentoDto = {
      amount: 99.9,
      description: 'Teste controller',
      email: 'cliente@teste.com',
      method_payment_id: 'pix', // Método de pagamento PIX
      binary_mode: true, // Modo binário
    };

    const mockResponse = {
      id: '987654',
      status: 'pending',
      qr_code: '00020126360014...controller',
      qr_code_base64: 'data:image/png;base64,controllerImage',
      external_reference: 'ref_controller',
    };

    mockPagamentoService.createPixPayment.mockResolvedValueOnce(mockResponse);

    const result = await controller.criarPagamentoPix(dto);

    expect(result).toEqual(mockResponse);
    expect(service.createPixPayment).toHaveBeenCalledWith(dto);
  });
});
