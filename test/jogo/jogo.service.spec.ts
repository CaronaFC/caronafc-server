import { Test, TestingModule } from '@nestjs/testing';
import { JogoService } from './jogo.service';

describe('JogoService', () => {
  let service: JogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogoService],
    }).compile();

    service = module.get<JogoService>(JogoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
