import { typeormConfigTest } from './ormconfig-test';

const database = {
  ...typeormConfigTest,
  entities: ['src/**/*.orm-entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/**/migrations/*.ts'],
  seeds: ['src/**/seeding/**/*.seeder.ts'],
  factories: ['src/**/factories/**/*.ts'],
  cli: {
    migrationsDir: `src/infrastructure/database/migrations`,
  },
};

export = database;
