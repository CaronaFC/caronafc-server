import { Test, TestingModule } from '@nestjs/testing';
import { TipoVeiculoController } from '../../src/modules/tipo-veiculo/controller/tipo-veiculo.controller';

describe('TipoVeiculoController', () => {
  let controller: TipoVeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoVeiculoController],
    }).compile();

    controller = module.get<TipoVeiculoController>(TipoVeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
