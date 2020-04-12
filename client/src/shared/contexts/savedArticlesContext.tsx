import React, { useContext, createContext, useReducer, useState, useEffect } from 'react';
import { deleteArticle as delArticle, addArticle } from '../../utils/requests';
import { AuthContext } from './authContext';
import { NotificationCtx } from './notificationCtx';
import getFetchedData from '../../utils/getFetchedData';

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
  getSavedArticles: () => void(0),
  isLoading: false,
  saveArticle: () => void(0),
});

interface IAction {
  type: 'fetch' | 'delete' | 'save' | 'clear'
  payload: IArticle[];
}

const SavedArticlesProvider: React.FC = ({ children }) => {
  const { notify } = useContext(NotificationCtx);
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [articles, dispatch] = useReducer((state: IArticle[], action: IAction) => {
    switch (action.type) {
      case 'fetch':
        return action.payload;
      case 'delete':
        return action.payload;
      case 'save':
        return action.payload;
      case 'clear':
        return [];
      default:
        return state;
    }
  }, []);

  const getSavedArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await fetch('/api/articles', {
        headers: {
          authorization: `Bearer ${token}`,
        }});

      const articles = await getFetchedData(data);
      dispatch({
        type: 'fetch',
        payload: articles,
      });
    } catch (error) {
      notify({
        body: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      if (!isLoggedIn) return;
      const { _id } = await delArticle(id);
      const remainingArticles = articles.filter(({ _id: articleId }) => articleId !== _id);
      dispatch({
        payload: remainingArticles,
        type: 'delete',
      });
      notify({
        body: 'Article Deleted',
      });
    } catch (error) {
      notify({
        body: error.message,
      });
    }
  }

  const saveArticle = async (article: IArticle) => {
    try {
      const savedArticle = await addArticle(article);
      dispatch({
        type: 'save',
        payload: [...articles, savedArticle],
      });
      notify({
        body: 'Article Saved',
      });
    } catch (error) {
      notify({
        body: error.message,
      });
    }
  }

    useEffect(() => {
    if (!isLoggedIn) {
      dispatch({
        type: 'clear',
        payload: [],
      });
    } else {
      if (isLoggedIn) getSavedArticles();
    }
  }, [isLoggedIn])

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

const useSavedArticles = () => useContext(SavedArticlesCtx);