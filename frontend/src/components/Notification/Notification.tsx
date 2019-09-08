import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInAndOut = keyframes`
  0% {
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Msg = styled.div<{ duration: number }>`
  color: #dcdde1;
  backdrop-filter: blur(3px);
  display: inline-grid;
  padding: 1.5rem 2rem;
  border-radius: 4px;
  background-color: rgba(45, 52, 54, .7);
  border: .04rem solid #ccc;
  box-shadow: 0 .5px 8px rgba(0, 0, 0, .4);
  font-weight: 500;
  font-family: sans-serif;
  letter-spacing: .1rem;
  word-spacing: .2rem;
  animation: ${fadeInAndOut} ${(props) => props.duration}s both ease-out;
`;


interface Props {
  duration: number;
  close: () => void;
  type?: 'info' | 'danger' | 'confirmation';
  onClose: () => void;
}

const Notification: React.FC<Props> = ({ close, duration, children, type = 'info', onClose }) => {
  const closeNotification = setTimeout(() => {
    close();
    onClose();
    clearTimeout(closeNotification);
  }, duration * 1000);
  return (
    <Msg duration={duration}>{children}</Msg>
  );
};

export default Notification
