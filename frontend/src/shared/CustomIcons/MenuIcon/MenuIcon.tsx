import React from 'react';
import styled from 'styled-components';
import Svg from '../Svg';

const StyledSvg = styled(Svg)`
  fill: #999;
  stroke: none;
`;

interface Props {

}

const MenuIcon: React.FC<Props> = ({ }) => {
  return (
    <StyledSvg viewBox="0 0 100 100">
      <circle cx="50" cy="20" r="10" />
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="80" r="10" />
    </StyledSvg>
  );
};

export default MenuIcon;
