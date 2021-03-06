import React from 'react'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Articles, About, SavedArticles } from '../../pages';
import { ScrappedArticlesProvider } from '../../shared/contexts/scrappedArticlesContext';

const StyledMain = styled.main`
  grid-column: center-start/center-end;
  grid-row: -2/-1;
  border: var(--light-border);
  background: var(--bg2);
`;

function Main() {
  return (
    <ScrappedArticlesProvider>
      <StyledMain>
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route exact path="/articles" component={SavedArticles} />
          <Route exact path="/about" component={About} />
        </Switch>
      </StyledMain>
    </ScrappedArticlesProvider>
  )
};

export default Main;


