import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  text-decoration: none;
  display: grid;
  justify-content: center;
  grid-gap: 4rem;
  grid-auto-flow: column;
  align-items: center;

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
  }

  a.active {
    color: var(--primary-color);
  }
`;

function Nav() {
  return (
    <StyledNav>
      <NavLink to="/articles" activeClassName="active">
        Articles
      </NavLink>
      <NavLink to="/articles/saved" activeClassName="active">
        Saved Articles
      </NavLink>
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>
    </StyledNav>
  );
}

export default Nav;
