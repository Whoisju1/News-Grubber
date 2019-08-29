import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../shared/contexts/scrappedArticlesContext';
import { AuthContext } from '../../shared/contexts/authContext';
import SavedArticle from './SavedArticle/SavedArticle';

const Section = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(12, [col-start] 1fr [col-end]);
  padding: 2rem 0;
  & > * {
    grid-column: 2/12;
  }
`;

function SavedArticles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      fetch('/api/articles', {
        headers: {
          authorization: `Bearer ${user.token}`,
        }})
        .then((data) => data.json())
        .then(data => setArticles(data));
    }
  }, [JSON.stringify(user)]);

  if (!articles.length) return <p>Please save an article first</p>;

  return (
    <Section>
      {
        articles.map(savedArticle => <SavedArticle {...savedArticle} />)
      }
    </Section>
  );
}

export default SavedArticles;
