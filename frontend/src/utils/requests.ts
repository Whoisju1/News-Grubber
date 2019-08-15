import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export const useScrappedArticles = (): IArticle[] => {
  const [scrapedArticles, setScrapedArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    axios.get<{ articles: IArticle[] }>('/api/articles/scrapped')
      .then(({ data }) => {
        console.log(data);
        setScrapedArticles(data.articles);
      });
  }, []);
  return scrapedArticles;
};
