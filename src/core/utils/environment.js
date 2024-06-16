import {config} from 'dotenv';
config();

export const ENVIRONMENT = {
  ENV: process.env.NODE_ENV,
}