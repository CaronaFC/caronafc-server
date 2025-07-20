import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from 'src/modules/veiculo/veiculo.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { veiculos, ...rest } = createUsuarioDto;
    const usuario = this.usuarioRepository.create(rest);

    if (veiculos && veiculos.length > 0) {
      const veiculosEntities = await this.veiculoRepository.findBy({
        id: In(veiculos.map(Number)), // Certifique-se que são números
      });
      usuario.veiculos = veiculosEntities;
    }

    return this.usuarioRepository.save(usuario);
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
      relations: ['veiculos', 'avaliacao'],
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
