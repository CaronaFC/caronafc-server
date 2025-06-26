import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AuthController } from '../../src/modules/auth/controller/auth.controller';
import admin from '../../src/modules/firebase/firebase-admin';

jest.mock('../../src/modules/firebase/firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: jest.fn(),
  }),
}));

// ---------- Unit Test User App -------------- //

// describe('AuthController', () => {
//   let controller: AuthController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         { provide: AuthService, useValue: { login: jest.fn()}}
//       ]
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//   });

  //TODO: create connection for create account test

  describe('AuthController', () => {
  let controller: AuthController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: { login: jest.fn() }},
        {
          provide: UsuarioService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('should create a new user if not found', async () => {
    const mockDecoded = {
      name: 'Test User',
      email: 'newuser@example.com',
      picture: 'http://img.com/pic.png',
    };
    (admin.auth().verifyIdToken as jest.Mock).mockResolvedValue(mockDecoded);
    (usuarioService.findOneByEmail as jest.Mock).mockResolvedValue(null);
    (usuarioService.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'newuser@example.com',
    });

    const result = await controller.firebaseLogin('Bearer validtoken');
    expect(usuarioService.findOneByEmail).toHaveBeenCalledWith('newuser@example.com');
    expect(usuarioService.create).toHaveBeenCalledWith(expect.objectContaining({
      nome_completo: 'Test User',
      email: 'newuser@example.com',
      imagem: 'http://img.com/pic.png',
    }));
    expect(result).toEqual({ id: 1, email: 'newuser@example.com' });
  });
});
