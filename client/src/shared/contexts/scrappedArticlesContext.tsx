import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import getFetchedData from '../../utils/getFetchedData';
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

interface IContextState {
  articles: IArticle[];
  updateArticles: () => void;
  loading: boolean;
}

interface IProps {
  children: React.ReactNode;
}

const initialCtxState: IContextState =  {
  articles: [],
  updateArticles: () => void(0),
  loading: false,
}

export const ScrappedArticlesContext = createContext<IContextState>(initialCtxState);

export const types = {
  UPDATE_ARTICLES: 'update_articles',
};

export const ScrappedArticlesProvider: React.FC<IProps> = ({ children }) => {
  const url = '/api/articles/scrapped';
  const [articles, setArticles] = useState<IArticle[]>([])
  const [loading, setLoading] = useState(false);
  const { notify } = useContext(NotificationCtx);

  useEffect(() => {
    setLoading(true);
    (async () => {
     try {
      const response = await fetch(url);
      const data = await getFetchedData(response, 'Could not fetch articles.');
      setArticles(data.articles);
     } catch (err) {
       // TODO: Display something on the screen if there's an error
       notify({ body: err.message });
     } finally {
      setLoading(false);
     }
    })();
  }, []);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case types.UPDATE_ARTICLES:
        return action.data;
      default:
        return state;
    }
  }, articles, () => articles);

  const updateArticles = () => {
    // TODO: Use in socket io to automatically update article when they are available
    dispatch({
      type: types.UPDATE_ARTICLES,
      data: [...articles],
    });
  }

  return (
    <ScrappedArticlesContext.Provider value={{ articles, updateArticles, loading }}>
      {children}
    </ScrappedArticlesContext.Provider>
  )
}