import React from 'react'
import styled from 'styled-components';

const StyledModal = styled.div<{ show: boolean }>``;

interface IProps {
  children: React.ReactNode;
  show: boolean;
}

function Modal ({ children, show }: IProps) {
  if (!show) return null;
  return (
    <StyledModal show={show}>
      {children}
    </StyledModal>
  );
}

export default Modal;
