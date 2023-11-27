import { Module } from '@nestjs/common';
import { ChatTextGateWay } from './ChatTextWs.gateway';
import { ChatTextService } from '../chatText/chatText.service';

@Module({
  imports: [],
  providers: [ChatTextGateWay, ChatTextService],
})
export class ChatTextWsModule {}
