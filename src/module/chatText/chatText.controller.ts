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
  @Get('getGenerateStream')
  async getGenerateStream(@Res() response, @Req() req): Promise<any> {
    const prompt = req.query.prompt;
    // 设置响应头，指定为流式数据
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');
    response.setHeader('Access-Control-Allow-Origin', '*');
    event.on('sendData', (data) => {
      response.write(`data: ${JSON.stringify(data)}\n\n`);
    });
    this.chatTextService.getGenerateStream(prompt, event);

    // 当客户端断开连接时停止传输
    req.on('close', () => {
      console.log('断开连接');
      response.end();
    });
  }
}
