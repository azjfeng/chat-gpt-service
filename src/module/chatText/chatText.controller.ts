import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { ChatTextService } from './chatText.service';
import { OpenAI } from 'openai';
import { Response } from 'express';
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
  async getGenerateStream(
    @Body() body: TextBody,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    console.log('body', body);
    // 设置响应头，指定为流式数据
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const prompt = body.prompt;
    // 当客户端断开连接时停止传输
    req.on('close', () => {
      console.log('asdsds');
      res.end();
    });
    const stream = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'say this is text' }],
      stream: true,
    });
    for await (const chunk of stream) {
      console.log(chunk);
      res.write(JSON.stringify(chunk));
    }
    // const intervalId = setInterval(() => {
    //   const data = { message: 'This is a test message' };
    //   res.write(`data: ${JSON.stringify(data)}\n\n`);
    // }, 1000);

    // req.on('close', () => {
    //   clearInterval(intervalId);
    //   res.end();
    // });
  }
}
