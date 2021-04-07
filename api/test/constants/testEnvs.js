// eslint-disable-next-line import/no-mutable-exports
let testEnv = {
  ...process.env,
};

const setIfNotSet = (envName = null, val = null) => {
  const env = testEnv.NODE_ENV;
  const isTestEnv = env === 'test';
  const envVar = testEnv[envName] || null;
  const assignedVal = isTestEnv && envVar !== null ? envVar : val;
  testEnv = {
    ...testEnv,
    [envName]: assignedVal,
  };
};

setIfNotSet('MONGODB_URI', 'mongodb://mongo-test:27017/news-grubber-dev');
setIfNotSet('REDIS_HOST', 'redis-test');
setIfNotSet('BCRYPT_SECRET_KEY', 'super_secret_key');
setIfNotSet('PORT', 5001);
setIfNotSet('REDIS_PORT', 6379);

export default testEnv;
