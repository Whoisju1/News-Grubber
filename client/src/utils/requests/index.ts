import React, { useState, useEffect } from 'react';
import { IArticle } from '../../shared/contexts/savedArticlesContext';
import getFetchedData from '../../utils/throwIfError';

export interface UserCredentials { username: string; password: string };

export interface User {
  _id: string;
  token: string;
  username: string;
}

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
  const deletedArticle = await getFetchedData(response);
  return deletedArticle;
}

export const addNote = async (articleId: string, note: string) => {
  const token = localStorage.getItem('token');
  const body = JSON.stringify({
    note: {
      body: note,
    }
  })
  const data = await fetch(`/api/notes?article_id=${articleId}`, {
    method: 'POST',
    body,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const newNote = await getFetchedData(data);
  return newNote;
}

export const fetchArticleNotes = async (articleId: string) => {
  const token = localStorage.getItem('token');
  const data = await fetch(`/api/articles/${articleId}/notes`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const notes = await getFetchedData(data);
  return notes;
}

export const deleteNote = async (noteId: string, articleId: string) => {
  const token = localStorage.getItem('token');
  const data = await fetch(`/api/notes/${noteId}?article_id=${articleId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const deletedNote = await getFetchedData(data);
  return deletedNote;
};

export const editNoteRequest = async (noteId: string, articleId: string, body: string) => {
  const token = localStorage.getItem('token');
  const data = await fetch(`/api/notes/${noteId}?article_id=${articleId}`, {
    method: 'PUT',
    body: JSON.stringify({
      note: {
        body,
      },
    }),
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }});

    const editedNote = await getFetchedData(data);
    return editedNote;
}

export const addArticle = async (article: IArticle) => {
  const token = localStorage.getItem('token');
  const data = await fetch('/api/articles/', {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }});

    const savedArticle = await getFetchedData(data);
    return savedArticle as IArticle;
}

export const signIn = async (body: UserCredentials): Promise<User> => {
  const data = await fetch('/api/auth/signin', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const response = await getFetchedData(data);
  return response;
}