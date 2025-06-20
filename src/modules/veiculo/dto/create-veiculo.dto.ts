export class CreateVeiculoDto {
  placa: string;
  renavam: string;
  marca: string;
  combustivel: string;
  tipoVeiculo: number; // Implementar para receber ID do tipo do veículo
  usuario: number;      // ID do usuário proprietário
}