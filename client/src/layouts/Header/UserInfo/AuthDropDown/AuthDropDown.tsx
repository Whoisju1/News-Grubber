import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import DropDown from '../../../../components/DropDown';
import { AuthContext } from '../../../../shared/contexts/authContext';
import SignUpModal from '../../../../components/SignUpModal';

const MenuItem = styled.li`

`;

const StyledHead = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  height: 100%;
  grid-gap: 2rem;
  img {
    width: 4rem;
    height: auto;
    border: .3rem solid #999999;
    border-radius: 100px;
    transition: border-color .2s ease-out;
  }
  .username {
    text-align: right;
    font-size: 2rem;
    text-transform: uppercase;
    color: #999999;
  }
  &:hover > img {
    border-color: var(--primary-color);
  }
`;

const AuthDropDown = () => {
  const { user, unregister, logout } = useContext(AuthContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const menuItems = [
    <MenuItem key={'323'} onClick={logout}>Sign Out</MenuItem>,
    <MenuItem key={'3a2'} onClick={unregister}>Unregister</MenuItem>,
  ];

  const Head = (
    <StyledHead>
      <span className="username">{user ? user.username : null}</span>
      <img src={`${process.env.PUBLIC_URL}/images/user_profile_image.png`} alt="Profile" />
    </StyledHead>
  );

  return (
    <>
      <SignUpModal isShown={showSignUpModal} hide={() => setShowSignUpModal(false)} />
      <DropDown Head={Head}>
        {menuItems}
      </DropDown>
    </>
  );
};

export default AuthDropDown;
