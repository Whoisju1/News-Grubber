import React from 'react';
import styled from 'styled-components';
import Svg from '../Svg';

const StyledSvg = styled(Svg)`
  symbol {
    stroke: rgb(101, 119, 134);
  }
  &:hover {
    & symbol {
    stroke: var(--primary-color);
  }
  }
`;

interface Props {
  preserveAspectRatio: string;
}

const TrashIcon : React.FC<Props> = ({ preserveAspectRatio }) => {
  return (
    <StyledSvg preserveAspectRatio={preserveAspectRatio}>
      <symbol
        id="trash-can"
        viewBox="0 0 100 100"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="rgb(101, 119, 134)"
        fill="transparent">
        <path
          id="cover"
          fill="transparent"
          d="
            M5,20
            H95
          "
        />
        <path
          fill="transparent"
          id="handle"
          d="
            M37,20
            A 6 8 0 0 1 63,20
          "
        />
        <path
          id="body"
          d="
            M20,20
            L30,85
            H70
            L80,20
          "
        />
      </symbol>
      <use xlinkHref="#trash-can" />
    </StyledSvg>
  );
}

export default TrashIcon
