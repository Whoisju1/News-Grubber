import React from 'react'
import styled from 'styled-components';

interface IStyledProps {
  show: boolean;
}
interface IProps extends IStyledProps {
  children: React.ReactNode;
}

const StyledModal = styled.div<IStyledProps>``;


const Modal: React.FC<IProps> = ({ children, show }) => {
  return (
    <StyledModal show={show}>
      {children}
    </StyledModal>
  )
};

export default Modal;
