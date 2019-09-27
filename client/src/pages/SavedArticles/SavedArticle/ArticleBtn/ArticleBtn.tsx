import React from 'react'
import styled from 'styled-components';

const StyledBtn = styled.a.attrs(({ title }) => ({ title }) )`
  display: grid;
  justify-content: left;
  cursor: pointer;
  height: 2.2rem;
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

