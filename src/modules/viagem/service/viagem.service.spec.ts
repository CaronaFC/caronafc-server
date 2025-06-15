import { Test, TestingModule } from '@nestjs/testing';
import { ViagemService } from '../service/viagem.service';

describe('ViagemService', () => {
  let service: ViagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViagemService],
    }).compile();

    service = module.get<ViagemService>(ViagemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
