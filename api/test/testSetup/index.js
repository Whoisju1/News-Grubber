import '@babel/register';
import testEnvs from '../constants/testEnvs';

export default () => {
  process.env = {
    ...process.env,
    ...testEnvs,
  };
};
