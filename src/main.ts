import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'production') {
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
    }

    bootstrap();
}

export const viteNodeApp = NestFactory.create(AppModule);
