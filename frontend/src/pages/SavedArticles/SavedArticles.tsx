import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../shared/contexts/scrappedArticlesContext';
import { AuthContext } from '../../shared/contexts/authContext';

const Section = styled.div`
  /* ... */
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
      {/* render list of articles */}
    </Section>
  );
}

export default SavedArticles;
