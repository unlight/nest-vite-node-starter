import { Injectable } from '@nestjs/common';

import { str as string_ } from './str';

@Injectable()
export class AppService {
    getHello(): string {
        return `Hello ${string_}!`;
    }
}
