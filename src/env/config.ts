import dotenv from "dotenv";

dotenv.config();

const {
  //Database connection string
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  //General configration
  NODE_ENV,
  PORT,
  //encryption VARs
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  JWT_STRING,
} = process.env;

export default {
  POSTGRES_HOST: POSTGRES_HOST,
  POSTGRES_DB: POSTGRES_DB,
  POSTGRES_USER: POSTGRES_USER,
  POSTGRES_PASSWORD: POSTGRES_PASSWORD,
  POSTGRES_TEST_DB: POSTGRES_TEST_DB,
  NODE_ENV: NODE_ENV,
  PORT: PORT,
  BCRYPT_PASSWORD: BCRYPT_PASSWORD,
  SALT_ROUNDS: SALT_ROUNDS,
  JWT_STRING: JWT_STRING,
};
