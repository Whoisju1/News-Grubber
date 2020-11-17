import React, { useState, useRef, useCallback } from 'react';
import getFetchedData from '../../../utils/getFetchedData';

const useFetch = <T extends any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [request, setRequest] = useState<RequestInfo>()
  const [init, setInit] = useState<RequestInit>({});

  React.useEffect(() => {
    // a fetch request will only be attempted if there is a request
    if (request) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch(request, {
              headers: {
                'Content-Type': 'application/json',
              }, ...init,
            });
          const responseData = await getFetchedData(response);
          setData(responseData);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [JSON.stringify(request)]);

  const callApi = useCallback((requestInfo: RequestInfo, requestInit?: RequestInit) => {
      setRequest(requestInfo);
      requestInit && setInit(requestInit);
    },
    [JSON.stringify(request), JSON.stringify(init)],
  );

  return {
    data,
    loading,
    error,
    callApi,
  }
};

export default useFetch;
