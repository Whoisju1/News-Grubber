import React from 'react';
import styled from 'styled-components';
import Svg from '../Svg';

const StyledSvg = styled(Svg)`
  #frame {
    stroke: #fff;
    stroke-width: 10;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  #pencil {
    stroke: #fff;
    stroke-width: 7;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  #backdrop {
    fill: #999;
    stroke: none;
  }
`;

interface Props {
  preserveAspectRatio?: string
}

const EditIcon: React.FC<Props> = ({ preserveAspectRatio = 'xMidYMid' }) => {
  return (
    <StyledSvg preserveAspectRatio={preserveAspectRatio}>
      <symbol id="edit-icon" viewBox="-15 -13 130 130">
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
          transform="rotate(45) translate(20, -50)"
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
      <symbol id="backdrop" viewBox="0 0 100 100">
        <circle
          cy="50"
          cx="50"
          r="50"
        />
      </symbol>
      <use xlinkHref="#backdrop" />
      <use xlinkHref="#edit-icon" />
    </StyledSvg>
  )
}

export default EditIcon
