import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useScrappedArticles } from '../../utils/requests';
import Article from './Article';

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 3rem;
  padding: 2rem 0;
`;

function Articles()  {
  const articles = useScrappedArticles();
  return (
    <Section>
      {articles.map((article) => <Article key={article.url} {...article} />)}
    </Section>
  )
}

export default Articles;
