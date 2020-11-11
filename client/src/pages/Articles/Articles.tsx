import React, { useContext, FC } from 'react'
import styled from 'styled-components';
import { ScrappedArticlesContext } from '../../shared/contexts/scrappedArticlesContext';
import Article from './Article';
import Loading from '../SavedArticles/Loading';

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 3rem;
  padding: 2rem 0;
`;

const Articles: FC = () => {
  const { articles, loading } = useContext(ScrappedArticlesContext);
  const articleList = articles.map((article) => <Article key={article.url} {...article} />);
  if (loading) return <Loading />
  return (
    <Section>
      {articleList}
    </Section>
  )
}

export default Articles;
