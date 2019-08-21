import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import {  AuthContext } from '../../../shared/contexts/authContext';
import SignUpModal from '../../../components/SignUpModal';

const StyledUserInfo = styled.div`
  /* ... */
`;

function UserInfo() {
  const [showSignUpModal, setShowSignUpModal] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <SignUpModal isShown={showSignUpModal} hide={() => setShowSignUpModal(false)} />
      <StyledUserInfo>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </StyledUserInfo>
    </>
  )
}

export default UserInfo;
