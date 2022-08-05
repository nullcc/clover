import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Initializing dotenv

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.orm-entity{.ts,.js}'],
  autoLoadEntities: true,
  // connectTimeoutMS: 2000,
  // logging: ['error', 'migration', 'schema'],
  synchronize: true,
  logging: true,
};
