import styled from 'styled-components';
export const ThumbnailImage = styled.img`
  transition: all .3s linear;
  object-fit: cover;
  width: 10rem;
  &:hover {
    filter: blur(1.5px) brightness(.9);
    background-size: 150%;
    height: auto;
    position: relative;
  }
`;