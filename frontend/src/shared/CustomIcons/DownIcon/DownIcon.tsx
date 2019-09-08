import React from 'react';
import styled, { keyframes } from 'styled-components';
import Svg from '../Svg';

const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-.7rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledSvg = styled(Svg)`
  stroke: rgb(101, 119, 134);
  transition: stroke .1s linear;
  transform-origin: 3% 50%;
  animation: ${fadeDown} .7s ease-out both;
  animation-iteration-count: 3;
  &:hover {
    stroke: var(--primary-color);
  }
  &:active {
    transform: translateY(0) scale(.99);
  }
`;

interface Props {
  preserveAspectRatio?: string;
}

const DownIcon: React.FC<Props> = ({ preserveAspectRatio = 'xMidYMid' }) => {
  return (
    <StyledSvg preserveAspectRatio={preserveAspectRatio} viewBox="0 -20 100 90">
      <symbol
        id="menu-icon"
        viewBox="0 0 100 100"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6">
        <path
          fill="none"
          d="M0,0 L50,55 100,0"
          id="line"
        ></path>
    </symbol>
    <use xlinkHref="#menu-icon" />
    </StyledSvg>
  );
};

export default DownIcon;
