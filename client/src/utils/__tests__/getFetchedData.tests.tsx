import { shallow } from 'enzyme';
import getFetchedData from '../getFetchedData';
import { getArgumentValues } from 'graphql/execution/values';


describe('`getFetchedData` function', () => {
  const defaultErrorMsg = 'default error message';
  const successfulResponseData = 'successful response';

  const mockFn = jest.fn(getFetchedData);
  jest.genMockFromModule('../getFetchedData');

  const createResponse = (body?: string | object, status = 200) => new Response(
    JSON.stringify(body || successfulResponseData),
    {
      status: status || 500,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  it('should be defined', () => {
    expect(getFetchedData).toBeDefined();
  });

  describe('When there is a successful request', () => {
    const payload = 'successful response';
    const successfulResponse = createResponse(payload);
    it('should resolve with the payload', async () => {
      await expect(getFetchedData(successfulResponse))
        .resolves
        .toBe(payload);
    });
  });

  describe('When the request has a status code of 500', () => {
    const errResponse = createResponse(undefined, 500);
    it('should throw an error with the generic message if passed in', () => {
      return expect(getFetchedData(errResponse, defaultErrorMsg))
        .rejects
        .toThrowError(defaultErrorMsg);
    });

    it('should throw an error with the default error message if no generic error message is passed in', async () => {
      await expect(getFetchedData(errResponse))
        .rejects
        .toThrowError('Something went wrong.');
    });
  });

  describe('When payload is a custom message from the backend', () => {
    const payload = { error: {
        message: 'custom error message',
      },
    };
    const response = createResponse(payload, 401)

    it('should resolve with custom message', async () => {
      await expect(getFetchedData(response))
        .rejects
        .toThrowError(payload.error.message);
    });

    it('should throw a default error if there is a faulty error response object', async () => {
      const faultyResponse1 = createResponse({}, 401);
      await expect(getFetchedData(faultyResponse1))
        .rejects
        .toThrowError('Something went wrong.');

      const faultyResponse2 = createResponse({ error: null }, 401);
      await expect(getFetchedData(faultyResponse2))
        .rejects
        .toThrowError('Something went wrong.');

      const faultyResponse3 = createResponse({ error: { message: null } }, 401);
      await expect(getFetchedData(faultyResponse3))
        .rejects
        .toThrowError('Something went wrong.');

      const faultyResponse4 = createResponse({ error: { message: '' } }, 401);
      await expect(getFetchedData(faultyResponse4))
        .rejects
        .toThrowError('Something went wrong.');
    });
  });
});
