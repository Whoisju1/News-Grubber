import React, { createContext, useReducer } from 'react';
import { useFetch } from '../../utils/requests';

export interface IPublicationDate {
  date?: string;
  time?: string;
}

export interface IAuthor {
  authorInfo: string;
  name: string;
}

export interface IArticle {
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
}

interface IProps {
  children: React.ReactNode;
}

const initialCtxState: IContextState =  {
  articles: [],
  updateArticles: () => void(0),
}

export const ScrappedArticlesContext = createContext<IContextState>(initialCtxState);

export const types = {
  UPDATE_ARTICLES: 'update_articles',
};

export const ScrappedArticlesProvider: React.FC<IProps> = ({ children }) => {
  const url = '/api/articles/scrapped';
  const { articles } = useFetch<{ articles: IArticle[]}>(url, { articles: []});
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
    <ScrappedArticlesContext.Provider value={{ articles, updateArticles }}>
      {children}
    </ScrappedArticlesContext.Provider>
  )
}