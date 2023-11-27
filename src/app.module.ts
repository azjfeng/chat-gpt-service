import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatTextModule } from './module/chatText/chatText.module';
import { ChatTextWsModule } from './module/chatTextWs/chatTextWs.module';

@Module({
  imports: [ChatTextModule, ChatTextWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
