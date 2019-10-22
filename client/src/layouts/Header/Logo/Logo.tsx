import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: var(--primary-color);
  color: #ffffff;
  font-size: 200%;
  padding: 1rem;
  grid-area: logo;
`;

function Logo() {
  return (
    <Div>
      NewsGrubber
    </Div>
  );
}

export default Logo;
