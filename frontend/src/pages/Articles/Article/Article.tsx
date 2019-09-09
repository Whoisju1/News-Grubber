import React, { useContext } from 'react'
import styled from 'styled-components';
import SaveBtn from './SaveBtn';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';
import { AuthContext } from '../../../shared/contexts/authContext';
import { SavedArticlesCtx } from '../../../shared/contexts/savedArticlesContext';
import { ThumbnailImage } from '../../../shared/StyledElements';

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

  ${ThumbnailImage} {
    grid-column: 1/2;
    grid-row: 1/2;
    position: relative;
  }

  button {
    grid-column: 3/4;
    grid-row: -2/-1;
  }

  .link--img-wrapper {
    display: inline-block;
    position: relative;
    transition: background-color .5s linear;
    &:hover::before {
      transition: background-color .5s linear;
      content: 'View Article';
      position: absolute;
      pointer-events: none;
      letter-spacing: .02rem;
      top: 0;
      left: 0;
      width: 100%;
      font-family: sans-serif;
      color: #fff;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 2.5rem;
      height: 100%;
      z-index: 2;
      letter-spacing: .03rem;
    }
  }

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: #333333;
  }

  div.info {
    grid-row-gap: .1rem;
    h1 {
      font-size: 2.1rem;
      font-weight: 600;
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
      color: #555555;
    }
    a.author {
      color: #777777;
      text-decoration-line: underline;
      margin-top: 1rem;
    }
        p {
      color: #777777;
      font-size: 1.3rem;
      display: grid;
      color: gray;
      grid-auto-flow: column;
      grid-column-gap: .5rem;
      justify-content: left;
      margin-top: .3rem;
    }
  }
`;

function Article(props: IArticle) {
  const { image, publicationDate, subTitle, title, url, author } = props;

  const { user } = useContext(AuthContext);
  const { saveArticle: addArticle } = useContext(SavedArticlesCtx);

  const saveArticle = async (e: React.MouseEvent) => {
    if (user) {
      addArticle(props);
    } else {
      alert('Please sign in first');
    }
  }

  return (
    <StyledArticle>
      <a href={url} target="_blank" rel="noopener noreferrer" className="link--img-wrapper">
        <ThumbnailImage src={image} alt="Article picture" />
      </a>
      <div className="info">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </a>
        <a href={author.authorInfo} target="_blank" rel="noopener noreferrer" className="author">{author.name}</a>
        <p>
          {publicationDate.date && <span className="date">{publicationDate.date}</span>}
          {publicationDate.date && <span className="time">{publicationDate.time}</span>}
        </p>
      </div>
      <SaveBtn click={saveArticle}>Save</SaveBtn>
    </StyledArticle>
  )
}

export default Article;
