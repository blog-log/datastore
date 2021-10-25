import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { config as loadEnvFile } from 'dotenv';
import { EnvironmentVariables } from './schema';

export function validate(): EnvironmentVariables {
  // load any possible env vars from .env file
  loadEnvFile();

  const validatedConfig = plainToClass(EnvironmentVariables, process.env);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
