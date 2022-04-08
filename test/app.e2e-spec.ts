import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createApp } from '../src/main';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await createApp({ logger: false });
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });

    it('/user (POST) (test class-transformer)', async () => {
        const result = await request(app.getHttpServer())
            .post('/user')
            .send({ email: 'christopher@crankman.com', password: '123456' });
        // .expect(201);
        expect(result.body).toEqual({
            email: 'christopher@crankman.com',
            password: '123456',
        });
    });
});
