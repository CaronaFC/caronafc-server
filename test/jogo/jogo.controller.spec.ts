import { Test, TestingModule } from '@nestjs/testing';
import { JogoController } from './jogo.controller';

describe('JogoController', () => {
  let controller: JogoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogoController],
    }).compile();

    controller = module.get<JogoController>(JogoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
