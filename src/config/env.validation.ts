import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Dialect {
  POSTGRES = 'postgres',
}

class EnvironmentVariables {
  //   @IsEnum(Environment)
  //   NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @IsEnum(Dialect)
  DB_DIALECT: Dialect;

  @IsString()
  DB_PWD: string;

  @IsString()
  DB_USER: string;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  JWT_SECRET: string;

  //   @IsString()
  //   @Matches(/^https?:\/\/([^\s/]+\.)*[^\s/]+(\/[^\s]*)?$/)
  //   FE_APP_URL: string;

  // Remove the properties that are not present in your .env file...
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
