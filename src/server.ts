// should be on top always
import 'reflect-metadata';
import Application from './application';

console.clear();
async function bootstrap() {
  new Application();
}

bootstrap();