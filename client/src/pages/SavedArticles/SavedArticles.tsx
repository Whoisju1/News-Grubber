import React, { useEffect, useContext } from 'react'
import styled from 'styled-components';
import SavedArticle from './SavedArticle/SavedArticle';
import { SavedArticlesCtx } from '../../shared/contexts/savedArticlesContext';
import { NotesContext } from '../../shared/contexts/notesContext';
import NoSavedArticles from './NoSavedArticles';
import { AuthContext } from '../../shared/contexts/authContext';
import UserNotLoggedIn from './UserNotLoggedIn';
import Loading from './Loading';

const Section = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(12, [col-start] 1fr [col-end]);
  padding: 2rem 0;
  & > * {
    grid-column: 2/12;
  }
`;

const SavedArticles: React.FC = () => {
  const { articles, getSavedArticles, isLoading } = useContext(SavedArticlesCtx);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) getSavedArticles()
  }, [JSON.stringify(articles)]);

  if (!isLoggedIn) return <UserNotLoggedIn />
  if (isLoading) return <Loading />
  if (!articles.length) return <NoSavedArticles />;

  return (
    <Section>
      {
        articles.map(savedArticle => (
          <NotesContext articleId={savedArticle._id}>
            <SavedArticle {...savedArticle} />
          </NotesContext>
        ))
      }
    </Section>
  );
}

export default SavedArticles;
