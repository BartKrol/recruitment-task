import { config } from 'dotenv';
config({ path: `./apps/api/.env` });

import { DataSource } from 'typeorm';
import configuration from '../config/configuration';

const databaseConfig = configuration().database;

export const [defaultConnection, migrationConnection] = databaseConfig;

//@ts-ignore
export default new DataSource(migrationConnection);
