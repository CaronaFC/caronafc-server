import { Test, TestingModule } from '@nestjs/testing';
import { ViagemController } from './viagem.controller';

describe('ViagemController', () => {
  let controller: ViagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViagemController],
    }).compile();

    controller = module.get<ViagemController>(ViagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
