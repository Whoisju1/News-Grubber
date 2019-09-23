import React, { useState } from 'react'
import styled from 'styled-components';
import LoginModal from '../../../components/LoginModal';
import SignUpModal from '../../../components/SignUpModal';

const Div = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 3rem;
  padding: 2rem;
  p {
    text-align: justify;
  }
  .auth {
    color: var(--primary-color);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserNotLoggedIn = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const showLogin = () => setShowLoginModal(true);
  const showSignUp =() => setShowSignUpModal(true);

  return (
    <>
      <Div>
        <p>
          You need to be
          {' '}<span className="auth" onClick={showLogin}>
          Signed In</span>{' '}
          to view this page. If you don't have an account please <span onClick={showSignUp} className="auth">Sign Up</span>.
        </p>
      </Div>
      {showLoginModal && <LoginModal show={showLoginModal} hide={() => setShowLoginModal(false)} />}
      {showSignUpModal && <SignUpModal hide={() => setShowSignUpModal(false)} isShown={showSignUpModal} />}
    </>
  )
}

export default UserNotLoggedIn
