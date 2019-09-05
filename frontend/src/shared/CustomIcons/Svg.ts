import styled from 'styled-components';

const Svg = styled.svg.attrs(({
  viewBox = '0 0 100 100',
  preserveAspectRatio = 'xMidYMid meet',
}) => ({
  viewBox,
  preserveAspectRatio,
}))`
  height: 100%;
  width: 100%;
`;

export default Svg;