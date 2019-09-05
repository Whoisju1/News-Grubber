import React, { useContext } from 'react'
import styled from 'styled-components';
import { ScrappedArticlesContext } from '../../shared/contexts/scrappedArticlesContext';
import Article from './Article';

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 3rem;
  padding: 2rem 0;
`;

function Articles()  {
  const { articles } = useContext(ScrappedArticlesContext);
  const articleList = articles.map((article) => <Article key={article.url} {...article} />);
  return (
    <Section>
      {articleList}
    </Section>
  )
}

export default Articles;
