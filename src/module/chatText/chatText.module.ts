import { Module } from '@nestjs/common';
import { ChatTextController } from './chatText.controller';
import { ChatTextService } from './chatText.service';

@Module({
  imports: [],
  controllers: [ChatTextController],
  providers: [ChatTextService],
})
export class ChatTextModule {}
