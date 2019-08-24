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
  z-index: 1;
  backdrop-filter: blur(3px) grayscale(.3);
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  .content {
    position: absolute;
    left: 50%;
    top: 40%;
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
  if (show) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
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
