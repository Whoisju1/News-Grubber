import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyleDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2.5rem;
`;

const StyledLink = styled(Link)`
  color: var(--primary-color);

`;

const NoSavedArticles = () => {
  return (
    <StyleDiv>
      <p>
        You have no articles saved. Go to the <StyledLink to="/">Homepage</StyledLink> to save any article that you find interesting.
      </p>
    </StyleDiv>
  )
}

export default NoSavedArticles
