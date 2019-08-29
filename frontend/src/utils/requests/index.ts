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

export const usePost = <T, K>(url: string, { body, initialState }: { initialState: K | null, body: T }): K | null => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setState(data));
  }, [])

  return state;
};

export const deleteArticle = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api/articles/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const deletedArticle = await response.json();
  return deletedArticle;
}