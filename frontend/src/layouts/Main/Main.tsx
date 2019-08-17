import React from 'react'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Articles, About, SavedArticles } from '../../pages';

const StyledMain = styled.main`
  grid-column: center-start/center-end;
  grid-row: -2/-1;
  border: var(--light-border);
  background: var(--secondary-background-color);
`;

function Main() {
  return (
    <StyledMain>
      <Switch>
        <Route exact path="/articles/" component={Articles} />
        <Route exact path="/articles/saved" component={SavedArticles} />
        <Route exact path="/about" components={About} />
      </Switch>
    </StyledMain>
  )
};

export default Main;

