import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatTextWsService {
  private readonly openaiService;
  constructor() {
    this.openaiService = new OpenAI({
      apiKey: '',
    });
  }
  async getGenerateStream(prompt: string, event: any) {
    const response = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    });
    for await (const chunk of response) {
      console.log('chunk', chunk);
      event.emit('sendData', chunk);
    }
  }
}
