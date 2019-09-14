import React from 'react'
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface StyledProps {
  hoverText: string;
  className?: string;
}

const ImageWrapper = styled.div<StyledProps>`
  grid-column: 1/2;
  grid-row: 1/ span 3;
  display: inline-block;
  position: relative;
  transition: background-color .5s linear;
  overflow: hidden;
  transition: all .1s ease-out .6s;
  border: .04rem solid #ccc;
  border-radius: 2px;
  &:hover::before {
    animation: ${fadeIn} .3s both linear;
    content: "${({ hoverText }) => hoverText}";
    position: absolute;
    pointer-events: none;
    letter-spacing: .02rem;
    top: 0;
    left: 0;
    width: 100%;
    font-family: sans-serif;
    color: #dfe6e9;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2.5rem;
    height: 100%;
    z-index: 2;
  }
  & img {
    transition: all .1s linear;
    width: 10rem;
    &:hover {
      filter: brightness(.5) blur(.2px);
      transform: scale(1.3);
      background-size: 150%;
      height: auto;
      position: relative;
    }
  }
`;

interface Props {
  src: string;
  alt: string;
  hoverText: string;
  className?: string;
}

const ArticleImg: React.FC<Props> = ({ src, alt, hoverText, className }) => {
  return (
    <ImageWrapper hoverText={hoverText} className={className}>
      <img src={src} alt={alt} />
    </ImageWrapper>
  );
};

export default ArticleImg;
