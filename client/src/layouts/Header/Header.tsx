import React from 'react'
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './Logo';
import UserInfo from './UserInfo';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr [col-end]);
  background: var(--bg2);
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
  .center-container {
    grid-column: 2/12;
    display: grid;
    grid-template-columns: min-content min-content min-content;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1rem;
    justify-content: space-between;
    grid-template-areas:
      "logo nav user"
      "logo nav user";
  }
  @media screen and (max-width: 985px) {
    grid-template-rows: 1fr 2rem;
    grid-row: 1/ span 2;
    background: none;
    border: none;
    .center-container {
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 8rem 5rem;
      grid-row: 1/span 2;
      grid-template-areas:
        "logo user user"
        "nav nav nav";
      grid-column: 1/-1;
    }
    & nav {
      background: #dcdde1;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div className="center-container">
        <Logo />
        <Nav />
        <UserInfo />
      </div>
    </StyledHeader>
  )
}

export default Header;
