import React from 'react'
import styled from 'styled-components';

const StyledBtn = styled.a.attrs(({ title }) => ({ title }) )`
  display: grid;
  justify-content: left;
  cursor: pointer;
  height: 2.2rem;
  & svg {
    transform-origin: 50% 50%;
  }
  &:hover svg {
    /* stroke: var(--primary-color); */
    /* transition: transform .06s ease; */
    /* transform: scale(1.1); */
    &:first-child {
      transform-origin: 0%;
    }
    &:last-child {
      transform-origin: 100%;
    }
  }
  &:active svg {
    /* transform: scale(.99); */
  }
`;

interface Props {
  click: () => void;
  title?: string;
}

const ArticleBtn: React.FC<Props> = ({ children, click, title = '' }) => {
  return (
    <StyledBtn onClick={click} title={title}>
      {children}
    </StyledBtn>
  )
};

export default ArticleBtn;

