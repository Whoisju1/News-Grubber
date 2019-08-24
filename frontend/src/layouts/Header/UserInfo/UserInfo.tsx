import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import {  AuthContext } from '../../../shared/contexts/authContext';
import SignUpModal from '../../../components/SignUpModal';
import DropDown from '../../../components/DropDown';

const StyledUserInfo = styled.div`
  /* ... */
`;

function UserInfo() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext)
  const dropDownMenuItems = [
    <div>
      Sign In
    </div>,
    <div>Sign Up</div>
  ]
  return (
    <>
      <SignUpModal isShown={showSignUpModal} hide={() => setShowSignUpModal(false)} />
      <StyledUserInfo>
        <DropDown Head={"Head"}>
          {dropDownMenuItems}
        </DropDown>
      </StyledUserInfo>
    </>
  )
}

export default UserInfo;
