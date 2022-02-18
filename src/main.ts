import {
    INestApplication,
    NestApplicationOptions,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function createApp(
    options?: NestApplicationOptions,
): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule, options);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            validationError: {
                target: false,
            },
        }),
    );
    // useContainer(app.select(AppModule), { fallbackOnErrors: true });
    return app;
}

async function main() {
    const app = await createApp();
    await app.listen(3000);
}

export let viteNodeApp;

if (process.env.NODE_ENV === 'production') {
    void main();
} else {
    viteNodeApp = createApp();
}
