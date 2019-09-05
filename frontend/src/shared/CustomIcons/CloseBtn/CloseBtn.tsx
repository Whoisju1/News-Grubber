import React from 'react'
import styled from 'styled-components';
import Svg from '../Svg';

const StyledSvg = styled(Svg)`
  #close-btn-symb {
    #backdrop {
      fill: gray;
      stroke: transparent;
    }
    #x {
      fill: #ffffff;
      stroke: #ffffff;
      stroke-width: 10;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
`;
const CloseBtn = () => {
  return (
    <StyledSvg>
      <symbol id="close-btn-symb">
        <circle
          id="backdrop"
          cx="50"
          cy="50"
          r="50"
        />
        <path
          id="x"
          d="
            M30,30
            L70,70
            M30,70
            L70,30
          "
        />
      </symbol>
      <use xlinkHref="#close-btn-symb" />
    </StyledSvg>
  )
}

export default CloseBtn;
