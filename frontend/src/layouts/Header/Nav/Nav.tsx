import React from 'react'
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';


const fadeInDrop = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -1rem);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const StyledLink = styled(NavLink)`
  position: relative;
  &,
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    font-family: sans-serif;
    font-size: 2.2rem;
    color: var(--primary-color);
    letter-spacing: .03rem;
  }
  &.active {
    &::after {
      content: ' ';
      position: absolute;
      height: 100%;
      width: 3rem;
      background-color: var(--primary-color);
      top: 110%;
      left: 50%;
      animation: ${fadeInDrop} .2s both ease .3s;
      clip-path: polygon(47% 100%, 0 0, 100% 0);
    }
  }
`;

const StyledNav = styled.nav`
  text-decoration: none;
  display: grid;
  justify-content: center;
  grid-gap: 4rem;
  grid-auto-flow: column;
  align-items: center;
`;

function Nav() {
  return (
    <StyledNav>
      <StyledLink to="/articles" activeClassName="active">
        Articles
      </StyledLink>
      <StyledLink to="/articles/saved" activeClassName="active">
        Saved Articles
      </StyledLink>
      <StyledLink to="/about" activeClassName="active">
        About
      </StyledLink>
    </StyledNav>
  );
}

export default Nav;
