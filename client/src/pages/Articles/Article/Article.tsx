import React, { useContext } from 'react'
import styled from 'styled-components';
import SaveBtn from './SaveBtn';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';
import { AuthContext } from '../../../shared/contexts/authContext';
import { SavedArticlesCtx } from '../../../shared/contexts/savedArticlesContext';
import { NotificationCtx } from '../../../shared/contexts/notificationCtx';
import ArticleImg from '../../../components/ArticleImg';
import { Title, SubTitle } from '../../../shared/StyledElements/Heading';

const Info = styled.div`
  grid-row-gap: .1rem;
  grid-column: 2/3;
  height: 100%;
  ${Title} {
    /* text-align: justify; */
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
`;

const StyledArticle = styled.div`
  grid-column: 2/12;
  display: grid;
  grid-template-columns: max-content 1fr 8rem;
  grid-template-rows: minmax(10rem, 1fr);
  padding-bottom: 1.2rem;
  grid-column-gap: 3rem;
  &:not(:last-child) {
    border-bottom: .5px solid black;
  }

  & .article-img {
    position: relative;
    width: 10rem;
    height: 10rem;
  }

  button {
    height: 2.5rem;
    align-self: end;
  }

  .link--img-wrapper {
    display: contents;
  }

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: #333333;
  }

  @media screen and (max-width: 791px){
    grid-row-gap: .5rem;
    ${Info} {
      grid-column: span 2;
    }
    button {
      grid-column: 2/ -1;
    }
  }
  @media screen and (max-width: 591px){
    ${Info} {
      grid-column: span 2;
    }
    button {
      grid-column: 1/ -1;
    }
  }
  @media screen and (max-width: 540px){
    grid-column-gap: 1rem;
    grid-column: 1/-1;
    margin: 0 .8rem;
    ${SubTitle} {
      margin-bottom: .3rem;
    }
  }
`;

function Article(props: IArticle) {
  const { image, publicationDate, subTitle, title, url, author } = props;
  const { notify } = useContext(NotificationCtx)

  const { user } = useContext(AuthContext);
  const { saveArticle: addArticle } = useContext(SavedArticlesCtx);

  const saveArticle = async (e: React.MouseEvent) => {
    if (user) {
      addArticle(props);
    } else {
      notify({
        body: 'Please sign in first',
      });
    }
  }

  return (
    <StyledArticle>
      <a href={url} target="_blank" rel="noopener noreferrer" className="link--img-wrapper">
        <ArticleImg src={image} alt="article thumbnail" hoverText="View Article" />
      </a>
      <Info>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </a>
        <a href={author.authorInfo} target="_blank" rel="noopener noreferrer" className="author">{author.name}</a>
        <p>
          {publicationDate.date && <span className="date">{publicationDate.date}</span>}
          {publicationDate.date && <span className="time">{publicationDate.time}</span>}
        </p>
      </Info>
      <SaveBtn click={saveArticle}>Save</SaveBtn>
    </StyledArticle>
  )
}

export default Article;
