import styled from 'styled-components';

const Svg = styled.svg.attrs(({
  viewBox = '0 0 100 100',
  preserveAspectRatio = 'xMidYMid meet',
}) => ({
  viewBox,
  preserveAspectRatio,
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
}))`
  height: 100%;
  width: 100%;
`;

export default Svg;