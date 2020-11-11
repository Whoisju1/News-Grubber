import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV: env = 'development' } = process.env;

const config = {
  development: {
    mongoUri: process.env.MONGODB_URI_DEV,
    port: process.env.PORT_DEV,
    jwtSecreteKey: process.env.SECRETE_KEY_DEV,
  },
  test: {
    mongoUri: process.env.MONGODB_URI_TEST,
    port: process.env.PORT_TEST,
    jwtSecreteKey: process.env.SECRETE_KEY_TEST,
  },
  production: {
    mongoUri: process.env.MONGODB_URI,
    port: process.env.PORT,
    jwtSecreteKey: process.env.SECRETE_KEY,
  },
};

// set node environment for all options in the config object
Object.keys(config).forEach(key => {
  config[key].nodeEnv = key;
});

export default config[env];
