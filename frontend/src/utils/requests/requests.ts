import React, { useState, useEffect } from 'react';

export const useFetch = <T>(url: string, initialState: T): T => {
  const [state, setState] = useState<T>(initialState);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState(data))
      .catch((err) => {
        setState(initialState);
      });
  }, []);
  return state;
}