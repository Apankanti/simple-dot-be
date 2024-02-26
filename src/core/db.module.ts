import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect, ReplicationOptions } from 'sequelize';

interface DatabaseConfig {
  dialect: Dialect;
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<Record<string, DatabaseConfig>>,
      ) => {
        const database = configService.get<DatabaseConfig>('database');
        if (!database) {
          throw new Error('Database config not provided');
        }

        const replication: ReplicationOptions = {
          read: [],
          write: {
            database: database.name,
            host: database.host,
            password: database.password,
            port: database.port,
            username: database.user,
          },
        };

        return {
          autoLoadModels: true,
          database: database.name,
          define: {
            timestamps: false,
          },
          dialect: database.dialect,
          logging: false,
          pool: {
            max: 32,
            min: 0,
          },
          replication,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
