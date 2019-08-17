import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: #ffffff;
  background-image: linear-gradient(50deg, var(--primary-color), #eb685a);
  cursor: pointer;
  transition: all .2s linear;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
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


