import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: #ffffff;
  background-color: var(--primary-color);
  cursor: pointer;
  transition: all .2s linear;
  &:hover {
    transform: translateY(-2px);
  }
`;

interface IProps {
  children: React.ReactNode;
  click: (e: React.MouseEvent) => void;
}

function SaveBtn ({ children, click }: IProps) {
  return (
    <Button onClick={click}>
      {children}
    </Button>
  );
}

export default SaveBtn;


