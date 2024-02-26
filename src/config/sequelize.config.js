/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config();

const sequelizeConfig = {
  development: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: true, // Enable logging
    password: process.env.DB_PWD,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
  },
  test: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    password: process.env.DB_PWD,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
  },
  production: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    password: process.env.DB_PWD,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
  },
};

module.exports = sequelizeConfig;
