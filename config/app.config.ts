export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expireLimit: process.env.JWT_EXPIRE_LIMIT || '1d',
  },
});
