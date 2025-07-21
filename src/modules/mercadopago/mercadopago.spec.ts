import { Test, TestingModule } from '@nestjs/testing';
import { Mercadopago } from './config/mercadopago';

describe('Mercadopago', () => {
  let provider: Mercadopago;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mercadopago],
    }).compile();

    provider = module.get<Mercadopago>(Mercadopago);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
