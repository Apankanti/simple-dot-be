export const SWAGGER = {
  TITLE: "Simple's REST Service",
  VERSION: '1.0',
  SCHEME: {
    CREATIO_API_KEY: 'x-api-key',
    EXTERNAL_API_KEY: 'x-api-key',
    FORMAT: 'JWT',
    IDENTIFIER: 'AUTHORIZATION-JWT',
    PROTOCOL: 'http',
    TYPE: 'bearer',
  },
  SERVERS: {
    LOCAL: 'http://localhost:3000',
    DEV: 'https://api.dev.simpleEcommerce.com',
    STAGING: 'https://api.staging.simpleEcommerce.com',
    PRODUCTION: 'https://api.simpleEcommerce.com',
  },
};
