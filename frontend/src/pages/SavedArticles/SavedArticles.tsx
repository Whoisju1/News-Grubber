import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import SavedArticle from './SavedArticle/SavedArticle';
import DeleteModal from '../../components/DeleteModal';
import AddNotesModal from '../../components/AddNotesModal';
import { SavedArticlesCtx } from '../../shared/contexts/savedArticlesContext';

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
  const { articles, getSavedArticles } = useContext(SavedArticlesCtx);

  useEffect(() => {
    getSavedArticles()
  }, [JSON.stringify(articles)])

  if (!articles.length) return <p>Please save an article first</p>;

  return (
    <Section>
      {
        articles.map(savedArticle =>
        <SavedArticle key={savedArticle._id} {...savedArticle} />)
      }
    </Section>
  );
}

export default SavedArticles;
