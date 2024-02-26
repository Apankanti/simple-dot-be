export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expireLimit: process.env.JWT_EXPIRE_LIMIT || '1d',
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_LIMIT || '2d',
  },
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    instanceName: process.env.DB_INSTANCE,
    name: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    userName: process.env.DB_USER,
  },
});
