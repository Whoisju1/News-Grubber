import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import DropDown from '../../../../components/DropDown';
import { AuthContext } from '../../../../shared/contexts/authContext';
import SignUpModal from '../../../../components/SignUpModal';

const MenuItem = styled.li`

`;

const AuthDropDown = () => {
  const { isLoggedIn, user, unregister, logout } = useContext(AuthContext);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const menuItems = [
    <MenuItem key={'323'} onClick={logout}>Sign Out</MenuItem>,
    <MenuItem key={'3a2'} onClick={unregister}>Unregister</MenuItem>,
  ];


  return (
    <>
      <SignUpModal isShown={showSignUpModal} hide={() => setShowSignUpModal(false)} />
      <DropDown Head={"User Info"}>
        {menuItems}
      </DropDown>
    </>
  );
};

export default AuthDropDown;
