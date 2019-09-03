import React from 'react';
import styled from 'styled-components';
import Svg from '../Svg';

const StyledSvg = styled(Svg)`
  #edit-icon {
    /* stroke: #999;
    stroke-width: 4; */
  }
  #frame {
    stroke: #999;
    stroke-width: 7;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  #pencil {
    stroke: #999;
    stroke-width: 4;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform-origin: 50% 50%;
    transform: rotate(45deg) scale(1.2);
  }
`;

const EditIcon = () => {
  return (
    <StyledSvg>
      <symbol id="edit-icon" viewBox="0 0 100 100">
        <path
          id="frame"
          d="
            M45,20
            H20
            V80
            H80
            v-20
          "
        />
        <path
          id="pencil"
          d="
            M40,20
            V50
            l11,13
            l11,-13
            V20
            V5
            A 26 50 0 0 0 40,5
            V20
            H60
            M40,50
            H60
            M55,26
            v18
            M40,15
            H60
          "
        />
      </symbol>
      <use xlinkHref="#edit-icon" />
    </StyledSvg>
  )
}

export default EditIcon
