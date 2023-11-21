import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatTextService {
  private readonly openaiService;
  constructor() {
    this.openaiService = new OpenAI({
      apiKey: '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',
    });
  }
  async getGenerate(prompt: string): Promise<string> {
    const response = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    console.log(response.choices[0].message.content);
    return response;
  }
  async getGenerateStream(prompt: string) {
    const stream = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });
    for await (const chunk of stream) {
      console.log(chunk);
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
    return 'aaaa';
  }
}
