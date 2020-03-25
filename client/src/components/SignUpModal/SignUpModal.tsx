import React, { useContext, useState } from 'react'
import Modal from '../../shared/Modal';
import AuthForm from '../AuthForm';
import { AuthContext, UserCredentials } from '../../shared/contexts/authContext';

interface Props {
  isShown: boolean;
  hide: () => void;
}

const SignUpModal: React.FC<Props> = ({ isShown, hide }) => {
  const { isLoggedIn, user, signup } = useContext(AuthContext);
  const handleSubmit = (userCred: UserCredentials) => {
    signup(userCred);
    if (isLoggedIn) {
      hide();
    }
  }
  return (
    <Modal show={isShown} hide={hide}>
      <AuthForm
        handleSubmit={handleSubmit}
        submitBtnValue="Sign Up"
        formHeading="Sign Up"
      />
    </Modal>
  )
}

export default SignUpModal;
