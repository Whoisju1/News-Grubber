import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Modal from '../../shared/Modal';
import AuthForm from '../AuthForm';
import { AuthContext, UserCredentials } from '../../shared/contexts/authContext';

interface Props {
  show: boolean;
  hide: () => void;
}
const LoginModal: React.FC<Props> = ({ show, hide }) => {
  const { signin, isLoggedIn, user } = useContext(AuthContext)
  const handleSubmit = (cred: UserCredentials) => {
    signin(cred);
    if (isLoggedIn) {
      hide();
    }
  }
  return (
    <Modal show={show} hide={hide}>
      <AuthForm
        handleSubmit={handleSubmit}
        formHeading="Sign In"
        submitBtnValue="Sign In"
      />
    </Modal>
  );
};

export default LoginModal;
