import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { AuthController } from '../../src/modules/auth/controller/auth.controller';
import admin from '../../src/modules/firebase/firebase-admin';

jest.mock('../../firebase/firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: jest.fn(),
  }),
}));

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: { login: jest.fn()}}
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should return id and email on valid token', async () => {
    const mockDecoded = { id: '123', email: 'test@example.com' };
    (admin.auth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecoded);

    const result = await controller.firebaseLogin('Bearer validtoken');
    expect(result).toEqual({ id: '123', email: 'test@example.com' });
  });

  it('should throw UnauthorizedException on invalid token', async () => {
    (admin.auth().verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    await expect(controller.firebaseLogin('Bearer invalidtoken')).rejects.toThrow('Invalid Firebase token');
  });

  it('should throw UnauthorizedException if no token provided', async () => {
    await expect(controller.firebaseLogin('')).rejects.toThrow('No token provided');
  });
});
