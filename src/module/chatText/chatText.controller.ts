import { Controller, Post } from '@nestjs/common';
import { ChatTextService } from './chatText.service';

@Controller('/api/text')
export class ChatTextController {
  constructor(private readonly appService: ChatTextService) {}

  @Post('getHello')
  getHello(): string {
    return this.appService.getHello();
  }
}
