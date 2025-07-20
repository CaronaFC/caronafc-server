import { JwtAuthGuard } from '../../src/modules/auth/guards/jwt-auth/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
