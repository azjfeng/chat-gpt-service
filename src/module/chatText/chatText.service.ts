import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatTextService {
  getHello(): string {
    return 'Hello World!';
  }
}
