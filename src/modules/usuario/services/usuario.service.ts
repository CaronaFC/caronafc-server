import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from 'src/modules/veiculo/veiculo.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../usuario.entity';
// 1. Importação necessária
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
    // 2. Injeção do serviço de e-mail
    private readonly mailerService: MailerService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { veiculos, email, ...rest } = createUsuarioDto;

    const existente = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (existente) {
      throw new BadRequestException('Já existe um usuário com este e-mail. Faça login ou redefina sua senha');
    }
    const usuario = this.usuarioRepository.create({ ...rest, email });

    if (veiculos && veiculos.length > 0) {
      const veiculosEntities = await this.veiculoRepository.findBy({
        id: In(veiculos.map(Number)), // Certifique-se que são números
      });
      usuario.veiculos = veiculosEntities;
    }

    // Salvamos o usuário numa variável para garantir que foi criado antes de enviar o e-mail
    const novoUsuario = await this.usuarioRepository.save(usuario);

    // 3. Lógica de Envio de E-mail de Boas-Vindas
    try {
      await this.mailerService.sendMail({
        to: novoUsuario.email,
        subject: 'Bem-vindo ao CaronaFC!',
        template: 'boas-vindas', // Certifique-se de que o arquivo .hbs existe
        context: {
          nome: novoUsuario.nome_completo,
        },
      });
    } catch (error) {
      // Logamos o erro mas não impedimos o cadastro
      console.error('Erro ao enviar e-mail de boas-vindas:', error);
    }

    return novoUsuario;
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['veiculos'] });
  }

  async findOneByName(name: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { nome_completo: name },
      relations: ['veiculos'],
    });
    if (!usuario) {
      throw new Error(`Usuário com nome ${name} não encontrado`);
    }
    return usuario;
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: email },
      relations: ['veiculos'],
    });
    if (!usuario) {
      throw new Error(`Usuário com email ${email} não encontrado`);
    }
    return usuario;
  }

  async findOneByNumber(numero: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { numero: numero },
      relations: ['veiculos'],
    });
    if (!usuario) {
      throw new Error(`Usuário com nome ${numero} não encontrado`);
    }
    return usuario;
  }

  async findOneByPassword(senha: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { senha: senha },
      relations: ['veiculos'],
    });
    if (!usuario) {
      throw new Error(`Usuário não encontrado`);
    }
    return usuario;
  }


  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['veiculos'],
    });
    if (!usuario) {
      throw new Error(`Usuario with id ${id} not found`);
    }
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['veiculos', 'avaliacoes'],
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Atualiza campos simples
    Object.assign(usuario, updateUsuarioDto);

    // Atualiza relação de veículos, se enviado no DTO
    if (updateUsuarioDto.veiculos) {
      const veiculos = await this.veiculoRepository.findBy({
        id: In(updateUsuarioDto.veiculos),
      });
      usuario.veiculos = veiculos;
    }

    await this.usuarioRepository.save(usuario);
    return this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.usuarioRepository.delete(id);
    return result;
  }
}