import React, { useContext, createContext, useReducer, useState } from 'react';
import { deleteArticle as delArticle, addArticle } from '../../utils/requests';
import { AuthContext } from './authContext';
import { NotificationCtx } from './notificationCtx';

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
  getSavedArticles: () => void;
  isLoading: boolean;
  saveArticle: (article: IArticle) => void;
}

export const SavedArticlesCtx = createContext<ISavedArticleCtx>({
  articles: [],
  deleteArticle: () => void(0),
  getSavedArticles: () => console.log('oh oh'),
  isLoading: false,
  saveArticle: () => void(0),
});

interface IAction {
  type: 'fetch' | 'delete' | 'save'
  payload: IArticle[];
}

const SavedArticlesProvider: React.FC = ({ children }) => {
  const { notify } = useContext(NotificationCtx);
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, dispatch] = useReducer((state: IArticle[], action: IAction) => {
    switch (action.type) {
      case 'fetch':
        return action.payload;
      case 'delete':
        return action.payload;
      case 'save':
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

  const saveArticle = async (article: IArticle) => {
    const savedArticle = await addArticle(article);
    dispatch({
      type: 'save',
      payload: [...articles, savedArticle],
    });
    notify({
      body: 'Article Saved',
    });
  }

  return (
    <SavedArticlesCtx.Provider value={{
      articles,
      deleteArticle,
      isLoading,
      getSavedArticles,
      saveArticle,
    }}>
      {children}
    </SavedArticlesCtx.Provider>
  );
};

export default SavedArticlesProvider;
