import useFetch from './useFetch';
import { renderHook, act } from '@testing-library/react-hooks';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

describe('useFetch custom hook', () => {
  beforeAll(() => {
    (global as any).fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });

  const initialReturnValues = {
    loading: true,
    error: null,
    data: null,
  }

  const expectedResponse = { brand: 'Apple' };
  const url = 'test.com';

  describe('Before `callApi` is called', () => {
    const { waitForNextUpdate, result } = renderHook(() => useFetch());
    it('should have correct initial return values', () => {
      expect(result.current).toMatchObject(initialReturnValues);
    });
  });

  describe('When `callApi` method has been invoked', () => {
    let waitForNextUpdate: any;
    let result: any;
    beforeEach(() => {
      const hook = renderHook(() => useFetch());
      waitForNextUpdate = hook.waitForNextUpdate;
      result = hook.result;

    });
    it('should return `expectedResponse` once `callApi` method is invoked', async () => {
      fetchMock.mock(url, expectedResponse);
      act(() => {
        result.current.callApi(url);
      });
      await waitForNextUpdate();
      expect(result.current.data).toMatchObject(expectedResponse);
    });

    it('should return the correct return values on status 500', async () => {
      fetchMock.mock(url, 500, {  overwriteRoutes: true });
      act(() => {
        result.current.callApi(url);
      });

      await waitForNextUpdate();

      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(new Error('Something went wrong.'));
    });

    it('should return the correct request wasn\'t successful', async () => {
      const errorPayload = {
        error: {
          message: 'You have entered the wrong password',
        },
      };
      fetchMock.mock(url, {
       body: errorPayload,
       status: 401,
      }, { overwriteRoutes: true });
      act(() => {
        result.current.callApi(url);
      });

      await waitForNextUpdate();

      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(new Error(errorPayload.error.message));
    });
  });

});
