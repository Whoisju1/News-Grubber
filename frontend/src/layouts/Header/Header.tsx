import React from 'react'
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './Logo';
import UserInfo from './UserInfo';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr [col-end]);
  grid-template-rows: 8rem;
  background: var(--secondary-background-color);
  grid-column: center-start/center-end;
  grid-row: 2/ span 1;
  grid-gap: 1rem;
  border: var(--light-border);
  & > * {
    &:nth-child(1) {
      grid-column: 2/span 2;
    }
    &:nth-child(2) {
      grid-column: 4/span 6;
    }
    &:nth-child(3) {
      grid-column: 10/12;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <Nav />
      <UserInfo />
    </StyledHeader>
  )
}

export default Header;
