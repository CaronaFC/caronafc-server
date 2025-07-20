import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AuthController } from '../../src/modules/auth/controller/auth.controller';

const verifyIdTokenMock = jest.fn();

jest.mock('../../src/modules/firebase/firebase-admin', () => ({
  __esModule: true,
  default: {
    auth: jest.fn(() => ({
      verifyIdToken: verifyIdTokenMock,
    })),
  },
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
      name: 'Renan Freitas',
      email: 'renanfeitas@gmail.com',
      picture: 'http://img.com/pic.png',
    };
    verifyIdTokenMock.mockResolvedValue(mockDecoded);
    (usuarioService.findOneByEmail as jest.Mock).mockResolvedValue(null);
    (usuarioService.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'renanfeitas@gmail.com',
    });

    const result = await controller.firebaseLogin('Bearer validtoken');
    expect(usuarioService.findOneByEmail).toHaveBeenCalledWith('renanfeitas@gmail.com');
    expect(usuarioService.create).toHaveBeenCalledWith(expect.objectContaining({
      nome_completo: 'Renan Freitas',
      email: 'renanfeitas@gmail.com',
      imagem: 'http://img.com/pic.png',
    }));
    expect(result).toEqual({ id: 1, email: 'renanfeitas@gmail.com' });
  });
});
