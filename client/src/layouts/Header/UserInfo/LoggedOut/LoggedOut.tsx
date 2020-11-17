import React, { useState } from 'react'
import styled from 'styled-components';
import LoginModal from '../../../../components/LoginModal';
import SignUpModal from '../../../../components/SignUpModal';

const StyledLoggedOut = styled.div`
  display: grid;
  grid-gap: 1rem;
  height: 100%;
  justify-content: right;
  align-items: center;
  grid-auto-flow: column;
  color: var(--primary-color);
  a {
    background: none;
    outline: none;
    cursor: pointer;
    color: var(--primary-color);
    font-weight: 100;
    letter-spacing: .03rem;
    font-size: 2rem;
    position: relative;
    ::before {
      content: ' ';
      position: absolute;
      background-color: var(--primary-color);
      height: 13%;
      width: 100%;
      top: 112%;
      transform: scaleX(0);
      transition: transform .1s ease-in-out;
    }
    &:hover::before {
      transform: scaleX(1);
    }
  }
  .separator {
    width: .1rem;
    background-color: var(--primary-color);
    /* border: .4rem solid var(--primary-color); */
    height: 40%;
  }
`;

const LoggedOut = () => {
  const [isLoginModalShown, setIsLoginModalShown] = useState(false);
  const [isSignupModalShown, setIsSignupModalShown] = useState(false);
  return (
    <>
      <LoginModal show={isLoginModalShown} hide={() => setIsLoginModalShown(false)} />
      <SignUpModal isShown={isSignupModalShown} hide={() => setIsSignupModalShown(false)} />
      <StyledLoggedOut>
        <a onClick={() => setIsLoginModalShown(true)}>Sign In</a>
        <div className="separator"></div>
        <a onClick={() => setIsSignupModalShown(true)}>Sign Up</a>
      </StyledLoggedOut>
    </>
  );
};

export default LoggedOut;
