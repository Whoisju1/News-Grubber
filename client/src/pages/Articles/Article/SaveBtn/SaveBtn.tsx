import React from 'react'
import styled from 'styled-components';
import Button from '../../../../shared/StyledElements/Button';

const StyledBtn = styled(Button)`
  font-size: 1.2rem;
  cursor: pointer;
`;

interface IProps {
  children: React.ReactNode;
  click: (e: React.MouseEvent) => void;
}

function SaveBtn ({ children, click }: IProps) {
  return (
    <StyledBtn btnType="ghost" onClick={click}>
      {children}
    </StyledBtn>
  );
}

export default SaveBtn;


