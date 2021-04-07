import dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT,
  jwtSecreteKey: process.env.BCRYPT_SECRET_KEY,
  redisHost: process.env.REDIS_HOST,
  nodeEnv: process.env.NODE_ENV,
  redisPort: process.env.REDIS_PORT,
};

export default config;
