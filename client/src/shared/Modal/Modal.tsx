import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import CloseBtn from './CloseBtn';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const dropDown = keyframes`
 0% {
    opacity: 0;
    transform: translateY(-2rem) translate(-50%, -50%);;
  }
  100% {
    opacity: 1;
    transform: translateY(0) translate(-50%, -50%);;
  }
`;

interface ModalProps {
  show: boolean;
}

const StyledModal = styled.div<ModalProps>`
  background: rgba(0, 0, 0, .3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  .content {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    animation: ${dropDown} .3s both ease-in;
    animation-delay: .2s;
  }
  animation: ${fadeIn} .5s both;
  @supports (backdrop-filter: blur(3px) grayscale(.3)) {
    & {
      background: transparent;
      backdrop-filter: blur(3px) grayscale(.3);
    }
  }
`;

interface IProps {
  children: React.ReactNode;
  show: boolean;
  showCloseBtn?: boolean;
  hide: () => void;
}

function Modal ({ children, show, showCloseBtn = true, hide }: IProps) {
  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hide();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscPress)
    return () => {
      document.removeEventListener('keyup', handleEscPress)
    };
  }, [])

  if (!show) return null;

  return (
    <StyledModal show={show}>
      {showCloseBtn ? <CloseBtn click={hide} /> : null}
      <div className="content">
        {children}
      </div>
    </StyledModal>
  );
}

export default Modal;
