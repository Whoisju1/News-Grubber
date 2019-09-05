import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import {  AuthContext } from '../../../shared/contexts/authContext';
import SignUpModal from '../../../components/SignUpModal';
import DropDown from '../../../components/DropDown';
import AuthDropDown from './AuthDropDown';
import LoggedOut from './LoggedOut';

const StyledUserInfo = styled.div`
  /* ... */
`;

function UserInfo() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <SignUpModal isShown={showSignUpModal} hide={() => setShowSignUpModal(false)} />
      <StyledUserInfo>
        {isLoggedIn ? <AuthDropDown /> : <LoggedOut /> }
      </StyledUserInfo>
    </>
  )
}

export default UserInfo;
