import React from 'react'
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';


const fadeInDrop = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%) scale(1);
  }
`;

const StyledLink = styled(NavLink)`
  position: relative;
  &,
  &:link,
  &:visited,
  &:active {
    outline: none;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 2.2rem;
    color: #999;
    letter-spacing: .03rem;
  }
  &.active {
    &::after {
      content: ' ';
      position: absolute;
      height: .4rem;
      width: 4rem;
      background-color: var(--primary-color);
      top: 130%;
      left: 50%;
      animation: ${fadeInDrop} .2s both ease .3s;
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
      <StyledLink exact to="/" activeClassName="active">
        Home
      </StyledLink>
      <StyledLink to="/articles" activeClassName="active">
        Saved Articles
      </StyledLink>
      <StyledLink to="/about" activeClassName="active">
        About
      </StyledLink>
    </StyledNav>
  );
}

export default Nav;
