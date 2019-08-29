import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../shared/contexts/scrappedArticlesContext';
import { AuthContext } from '../../shared/contexts/authContext';
import SavedArticle from './SavedArticle/SavedArticle';
import DeleteModal from '../../components/DeleteModal';
import { deleteArticle } from '../../utils/requests';

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
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
  const [articleToDeleteId, setArticleToDeleteId] = useState('');
  const { user } = useContext(AuthContext);
  const launchDeleteModal = (id: string) => {
    setArticleToDeleteId(id);
    setDeleteModalIsShown(true);
  };

  const removeArticle = async () => {
    await deleteArticle(articleToDeleteId);
    setDeleteModalIsShown(false);
    const remainingArticles = articles.filter(({ _id: articleId }) => articleToDeleteId !== articleId)
    setArticles(remainingArticles);
  }
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
    <>
      <Section>
        {
          articles.map(savedArticle => <SavedArticle launchDltModal={launchDeleteModal} {...savedArticle} />)
        }
      </Section>
      {
        deleteModalIsShown
        ? <DeleteModal
          isShown={deleteModalIsShown}
          buttonValue="Delete Article"
          confirmationMsg="Are you sure you want to delete this article?"
          hide={() => setDeleteModalIsShown(false)}
          deleteAction={removeArticle}
          cancelBtnValue="Cancel"
        />
        : null
      }
    </>
  );
}

export default SavedArticles;
