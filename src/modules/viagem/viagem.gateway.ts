import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ViagemGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`Cliente conectado: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Cliente desconectado: ${socket.id}`);
  }

  @SubscribeMessage('entrarViagem')
  handleEntrarViagem(
    @MessageBody() viagemId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(viagemId);
    console.log(`Socket ${socket.id} entrou na viagem ${viagemId}`);
  }

  @SubscribeMessage('motorista:localizacao')
  handleLocalizacaoMotorista(
    @MessageBody()
    data: { viagemId: string; latitude: number; longitude: number },
  ) {
    this.server.to(data.viagemId).emit('motorista:atualizacao', {
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }

  @SubscribeMessage('viagem:finalizar')
  handleFinalizarViagem(
    @MessageBody() data: { viagemId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.to(data.viagemId).emit('viagem:finalizada');
  }
}
