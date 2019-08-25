import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';

const StyledContainer = styled.div`
  /* ... */
`;

interface Props extends IArticle {

}

const SavedArticle: React.FC<Props> = (props) => {
  const { date, time } = props.publicationDate;
  return (
    <StyledContainer>
      <div className="image">
        <img src={props.image} alt="article pic"/>
        </div>
      <div className="heading">
        <h1 className="title">{props.title}</h1>
        <h2 className="subtitle">{props.subTitle}</h2>
      </div>
      <a href={props.author.authorInfo} className="author">{props.author.name}</a>
      <div className="date">{date} {time}</div>
    </StyledContainer>
  );
};

export default SavedArticle;
