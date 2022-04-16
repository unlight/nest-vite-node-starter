import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }: ConfigEnv) => {
    return {
        build: {
            target: 'es2020',
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        optimizeDeps: {
            // Vite does not work well with optionnal dependencies, mark them as ignored for now
            exclude: [
                '@nestjs/platform-socket.io',
                '@nestjs/websockets',
                '@nestjs/microservices',
                'amqp-connection-manager',
                'amqplib',
                'nats',
                '@grpc/proto-loader',
                '@grpc/grpc-js',
                'redis',
                'kafkajs',
                'mqtt',
                'cache-manager',
            ],
        },
        plugins: [
            tsconfigPaths(),
            ...VitePluginNode({
                adapter: 'nest',
                appPath: './src/main.ts',
                tsCompiler: 'swc',
            }),
        ],
    };
});
