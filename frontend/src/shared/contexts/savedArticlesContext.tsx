import React, { useContext, createContext, useReducer, useEffect, useState } from 'react';
import { deleteArticle as delArticle } from '../../utils/requests';
import { AuthContext } from './authContext';

export interface IPublicationDate {
  date?: string;
  time?: string;
}

export interface IAuthor {
  authorInfo: string;
  name: string;
}

export interface IArticle {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  url: string;
  publicationDate: IPublicationDate;
  author: IAuthor;
}

interface ISavedArticleCtx {
  articles: IArticle[];
  deleteArticle: (id: string) => void;
  addArticle: () => void;
  getSavedArticles: () => void;
  isLoading: boolean;
}

export const SavedArticlesCtx = createContext<ISavedArticleCtx>({
  articles: [],
  deleteArticle: () => void(0),
  addArticle: () => void(0),
  getSavedArticles: () => console.log('oh oh'),
  isLoading: false,
});

interface IAction {
  type: 'fetch' | 'delete'
  payload: IArticle[];
}

const SavedArticlesProvider: React.FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, dispatch] = useReducer((state: IArticle[], action: IAction) => {
    switch (action.type) {
      case 'fetch':
        return action.payload;
      case 'delete':
        return action.payload;
      default:
        return state;
    }
  }, []);

  const getSavedArticles = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    fetch('/api/articles', {
      headers: {
        authorization: `Bearer ${token}`,
      }})
      .then((data) => data.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: 'fetch',
          payload: data,
        });
      })
      .finally(() => setIsLoading(false));
  }

  const deleteArticle = async (id: string) => {
    if (!isLoggedIn) return;
    const { _id } = await delArticle(id);
    const remainingArticles = articles.filter(({ _id: articleId }) => articleId !== _id);
    dispatch({
      payload: remainingArticles,
      type: 'delete',
    });
  }

  const addArticle = async () => {
    if (!isLoggedIn) return;
    console.log('add article');
  }

  return (
    <SavedArticlesCtx.Provider value={{
      articles,
      deleteArticle,
      addArticle,
      isLoading,
      getSavedArticles,
    }}>
      {children}
    </SavedArticlesCtx.Provider>
  );
};

export default SavedArticlesProvider;
