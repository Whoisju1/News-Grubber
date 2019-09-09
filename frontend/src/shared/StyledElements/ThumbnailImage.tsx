import styled from 'styled-components';
export const ThumbnailImage = styled.img`
  transition: all .3s linear;
  object-fit: cover;
  width: 10rem;
  &:hover {
    filter: blur(1.5px) grayscale(.7) brightness(.7);
    background-size: 150%;
    height: auto;
    position: relative;
  }
`;