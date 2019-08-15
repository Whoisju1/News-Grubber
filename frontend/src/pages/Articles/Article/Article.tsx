import React from 'react'
import styled from 'styled-components';
import { IArticle } from '../../../utils/requests';
import SaveBtn from './SaveBtn';

const StyledArticle = styled.div`
  grid-column: 2/12;
  display: grid;
  grid-template-columns: min-content 1fr 8rem;
  grid-template-rows: max-content 2.5rem;
  padding-bottom: 1.2rem;
  grid-column-gap: 3rem;
  &:not(:last-child) {
    border-bottom: .5px solid black;
  }

  img {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  button {
    grid-column: 3/4;
    grid-row: -2/-1;
  }

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
  }

  div.info {
    grid-row-gap: .1rem;
    h1 {
      font-size: 2.1rem;
    }
    a,
    a:link,
    a:visited,
    a:active {
      text-decoration: none;
      &:hover {
        text-decoration-color: var(--primary-color);
        text-decoration-line: underline;
      }
    }
    h2 {
      font-size: 1.7rem;
    }
    p {
      font-size: 1.3rem;
      display: grid;
      color: gray;
    }
  }
`;

function Article(props: IArticle) {
  const { image, publicationDate, subTitle, title, url, author } = props;
  return (
    <StyledArticle>
      <img src={image} alt="Article picture" />
      <div className="info">
        <a href={url} target="_blank">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </a>
        <a href={author.authorInfo} target="_blank" rel="noopener noreferrer">{author.name}</a>
        <p>
          {publicationDate.date && <span className="date">{publicationDate.date}</span>}
          {publicationDate.date && <span className="time">{publicationDate.time}</span>}
        </p>
      </div>
      <SaveBtn click={() => void (0)}>Save</SaveBtn>
    </StyledArticle>
  )
}

export default Article;
