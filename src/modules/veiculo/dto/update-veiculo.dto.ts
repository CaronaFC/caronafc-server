export class UpdateVeiculoDto {
  placa?: string;
  renavam?: string;
  marca?: string;
  combustivel?: string;
  tipoVeiculo?: number; // ID do TipoVeiculo (opcional)
  usuario?: number;     // ID do usuário proprietário
}