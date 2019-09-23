import React from 'react'
import styled from 'styled-components';
import { DownIcon } from '../../../../shared/CustomIcons';

const StyledBtn = styled.a`
  height: 1rem;
`;

interface Props {

}

const MenuBtn = () => {
  return (
    <StyledBtn className="menu-btn">
      <DownIcon />
    </StyledBtn>
  )
}

export default MenuBtn
