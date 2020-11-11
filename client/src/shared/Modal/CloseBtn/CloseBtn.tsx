import React from 'react'
import styled from 'styled-components';

const Svg = styled.svg.attrs({
  viewBox: '0 0 100 100',
  preserveRatioAspect: 'xMinYmin meet',
})`
  height: 4rem;
  width: 4rem;
  position: absolute;
  top: 5%;
  right: 5%;
  cursor: pointer;
  path {
    stroke: #ffffff;
    fill: #ffffff;
    stroke-width: 9;
  }
  @supports (backdrop-filter: blur(3px) grayscale(.3)) {
    path {
      stroke: var(--primary-color);
      fill: var(--primary-color);
    }
  }
`;

export interface IProps {
  click: () => void;
}

const CloseBtn: React.FC<IProps> = ({ click }) => {
  return (
    <Svg onClick={click}>
      <title>Close</title>
      <path
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M0,0 100,100 M0,100 100,0"
      />
    </Svg>
  );
};

export default CloseBtn;
