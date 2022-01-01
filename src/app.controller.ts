import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/random')
    getRandom(): string {
        return Math.random().toString();
    }

    @Post('/user')
    echo(@Body() createUserDto: CreateUserDto) {
        return createUserDto;
    }
}
