import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { ChatTextService } from './chatText.service';
import { OpenAI } from 'openai';
import EventEmitter = require('events');
const event = new EventEmitter();

interface TextBody {
  prompt: string;
}

@Controller('/api/text')
export class ChatTextController {
  private readonly openaiService;
  constructor(private readonly chatTextService: ChatTextService) {
    this.openaiService = new OpenAI({
      apiKey: '',
    });
  }

  @Post('getGenerate')
  async getGenerate(@Body() body: TextBody): Promise<string> {
    const prompt = body.prompt;
    const data = await this.chatTextService.getGenerate(prompt);
    return data;
  }
}
