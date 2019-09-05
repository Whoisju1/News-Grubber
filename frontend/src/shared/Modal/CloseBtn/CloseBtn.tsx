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
`;

interface Props {
  click: () => void;
}

const CloseBtn: React.FC<Props> = ({ click }) => {
  return (
    <Svg onClick={click}>
      <title>Close</title>
      <path
        stroke="#353b48"
        strokeWidth="7"
        fill="#353b48"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M0,0 100,100 M0,100 100,0"
      />
    </Svg>
  );
};

export default CloseBtn;
