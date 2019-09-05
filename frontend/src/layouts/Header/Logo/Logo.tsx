import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
  background-color: var(--primary-color);
  color: #ffffff;
`;

function Logo() {
  return (
    <Div>
      NewsGrubber
    </Div>
  );
}

export default Logo;
