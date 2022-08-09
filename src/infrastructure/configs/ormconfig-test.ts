import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfigTest: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'clover',
  entities: ['dist/**/*.orm-entity{.ts,.js}'],
  autoLoadEntities: true,
  // connectTimeoutMS: 2000,
  // logging: ['error', 'migration', 'schema'],
  synchronize: true,
  logging: false,
};
