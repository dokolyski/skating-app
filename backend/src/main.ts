import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import ValidationPipe from './validation-pipe'
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')
    app.useGlobalPipes(ValidationPipe)

    const options = new DocumentBuilder()
        .setTitle('Backend')
        .setDescription('Backend description')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    app.use(cookieParser());

    await app.listen(80);
}

bootstrap();
