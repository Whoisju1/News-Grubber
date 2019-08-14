import React from 'react'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Articles } from '../../pages';

const StyledMain = styled.main``;

function Main() {
  return (
    <StyledMain>
      <Switch>
        <Route path="articles" component={Articles} />
      </Switch>
    </StyledMain>
  )
};

export default Main;


