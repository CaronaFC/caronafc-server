import { Test, TestingModule } from '@nestjs/testing';
import { TipoVeiculoService } from '../../../src/modules/tipo-veiculo/services/tipo-veiculo.service';

describe('TipoVeiculoService', () => {
  let service: TipoVeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoVeiculoService],
    }).compile();

    service = module.get<TipoVeiculoService>(TipoVeiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
