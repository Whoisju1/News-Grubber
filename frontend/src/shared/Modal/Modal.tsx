import React from 'react'
import styled from 'styled-components';
import CloseBtn from './CloseBtn';

interface ModalProps {
  show: boolean;
}

const StyledModal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .3);
  .content {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }
`;

interface IProps {
  children: React.ReactNode;
  show: boolean;
  showCloseBtn?: boolean;
  hide: () => void;
}

function Modal ({ children, show, showCloseBtn = false, hide }: IProps) {
  if (!show) return null;
  return (
    <StyledModal show={show}>
      <CloseBtn click={hide} />
      <div className="content">
        {children}
      </div>
    </StyledModal>
  );
}

export default Modal;
