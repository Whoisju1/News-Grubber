import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import DropDown from '../../../../components/DropDown';
import { AuthContext } from '../../../../shared/contexts/authContext';

const MenuItem = styled.li`

`;

const AuthDropDown = () => {
  const { isLoggedIn, user, unregister } = useContext(AuthContext);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const menuItems = [
    <MenuItem key={'323'} onClick={() => setShowSignInModal(true)}>Sign In</MenuItem>,
    <MenuItem key={'3a2'} onClick={() => setShowSignUpModal(true)}>Sign Up</MenuItem>,
  ];


  return (
    <>
      <DropDown Head={"User Info"}>
        {menuItems}
      </DropDown>
    </>
  );
};

export default AuthDropDown;
