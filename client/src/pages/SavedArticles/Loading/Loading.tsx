import React from 'react'
import styled from 'styled-components';

const StyledLoading = styled.div`
  display: grid;
  justify-content: center;
  align-items: start;
  font-size: 2rem;
  padding: 2rem;
  height: 100%;
`;

const Loading = () => {

  return (
    <StyledLoading>
      Loading...
    </StyledLoading>
  )
}

export default Loading;
