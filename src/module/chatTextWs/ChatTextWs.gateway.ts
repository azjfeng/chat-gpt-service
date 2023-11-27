import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatTextService } from '../chatText/chatText.service';

@WebSocketGateway(4000)
export class ChatTextGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatTextservice: ChatTextService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('chunk-message')
  handleMessage(client: Socket, payload: any): string {
    console.log('Received message:', payload);
    return 'Message received';
  }
}
