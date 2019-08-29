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
  launchDltModal: () => void;
}

const SavedArticle: React.FC<Props> = (props) => {
  const { date, time } = props.publicationDate;
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
          <ArticleBtn click={() => void(0)} title="Add note about article">
            <AddNoteIcon />
          </ArticleBtn>
          <ArticleBtn click={props.launchDltModal} title="Delete this article">
            <TrashIcon preserveAspectRatio="xMidYMid" />
          </ArticleBtn>
          <ArticleBtn click={() => void(0)} title="View Notes">
            <MenuIcon />
          </ArticleBtn>
        </div>
      </StyledContainer>
    </>
  );
};

export default SavedArticle;
