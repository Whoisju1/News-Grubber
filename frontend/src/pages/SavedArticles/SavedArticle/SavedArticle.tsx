import React, { useState } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';
import ArticleBtn from './ArticleBtn';
import MenuBtn from './MenuBtn';
import { AddNoteIcon, TrashIcon, MenuIcon } from '../../../shared/CustomIcons';
import DeleteModal from '../../../components/DeleteModal';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, min-content);
  grid-auto-rows: min-content;
  grid-gap: .8rem;
  a,
  a:active,
  a:link,
  a:visited {
    text-decoration: none;
  }
  .image {
    grid-column: 1/2;
    grid-row: 1/ span 4;
  }

  .heading {
    grid-column: 2/13;
    display: grid;
    grid-gap: .1rem;
    h1 {
      font-size: 1.9rem;
    }
  }
  .author {
    grid-column: 2/5;
  }
  .date {
    grid-column: 2/5;
    font-size: 1.4rem;
  }

  .article-buttons {
    grid-column: 11/13;
    grid-row: 3/4;
    height: 3rem;
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fit, minmax(1rem, 3rem));
    transform: translateY(-.6rem);
    min-width: 5rem;
  }
  :not(:last-child) {
    border-bottom: .04rem solid lightgray;
  }
`;

interface Props extends IArticle {

}

const SavedArticle: React.FC<Props> = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(true);
  const showDelModal = () => setShowDeleteModal(true);
  const { date, time } = props.publicationDate;
  console.log(showDeleteModal);
  return (
    <>
      <StyledContainer>
        <a className="image" href={props.url} target="_blank">
        <img src={props.image} alt="article pic"/>
        </a>
        <a className="heading" href={props.url} target="_blank">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">{props.subTitle}</h2>
        </a>
        <a href={props.author.authorInfo} className="author" target="_blank">{props.author.name}</a>
        <div className="date">{date} {time}</div>
        <div className="article-buttons">
          {/* TODO: replace buttons with svg elements */}
          <ArticleBtn click={() => void(0)} title="Add note about article">
            <AddNoteIcon />
          </ArticleBtn>
          <ArticleBtn click={showDelModal} title="Delete this article">
            <TrashIcon preserveAspectRatio="xMidYMid" />
          </ArticleBtn>
          <ArticleBtn click={() => void(0)} title="View Notes">
            <MenuIcon />
          </ArticleBtn>
        </div>
      </StyledContainer>
      {
        showDeleteModal
        ? <DeleteModal
            isShown={showDeleteModal}
            buttonValue="Delete Article"
            confirmationMsg="Are you sure you want to delete this article?"
            hide={() => setShowDeleteModal(false)}
            deleteAction={async () => console.log('deleted')}
            cancelBtnValue="Cancel"
          />
          : null
      }
    </>
  );
};

export default SavedArticle;
