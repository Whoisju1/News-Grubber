import { CustomError } from '../src/customErrors';

describe('Custom Errors', () => {
  class DerivedFromCustomClass extends CustomError {}

  const errMsg = 'Oh oh! Something went wrong.';
  const httpStatus = 400;
  const errInstance = new DerivedFromCustomClass(errMsg, httpStatus);

  describe('Custom Error class', () => {
    it.skip('should log error messages', () => {});
  });

  describe('Instances that derive from Custom Error class', () => {
    it('it should have a message and a status property', () => {
      expect(errInstance).toHaveProperty('message');
      expect(errInstance).toHaveProperty('status');
    });

    it('should should have a properties that reflect what is passed into constructor', () => {
      expect(errInstance.message).toBe(errMsg);
      expect(errInstance.status).toBe(400);
    });
  });
});
