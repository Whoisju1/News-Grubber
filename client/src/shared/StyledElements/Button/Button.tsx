import styled, { css } from 'styled-components';

type BtnType = 'ghost' | 'filled' | 'text';

const styleBtn = (type: BtnType = 'ghost') => {
  switch (type) {
    case 'ghost':
      return css`
        &:not(:disabled) {
          outline: none;
          border: .13em solid var(--primary-color);
          background-color: transparent;
          color: var(--primary-color);
          &:hover {
            color: #fff;
            background: var(--primary-color);
          }
          &:active {
            outline: none;
            background-image: linear-gradient(to right, #c23616, var(--primary-color));
          }
        }
      `;
    case 'filled':
      return css`
        &:not(:disabled) {
          outline: none;
          background-color: var(--primary-color);
          box-shadow: .1rem .1rem .2rem rgba(0, 0, 0, .3);
          color: #fff;
          transition: all .02s linear;
          border: none;
          &:hover {
            transform: translateY(-.1rem);
            box-shadow: .18rem .5rem .5rem rgba(0, 0, 0, .3);
          }
          &:active {
            outline: none;
            transform: translateY(.09rem);
            box-shadow: .1rem .2rem .1rem rgba(0, 0, 0, .3);
            background-color: #c23616;
          }
        }
      `;
    case 'text':
      return css`

      `;
  }
}

const StyledButton = styled.button<{ btnType: BtnType}>`
  display: grid;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: .7rem;
  outline: none;
  ${({ btnType }) => styleBtn(btnType)}
  &:disabled {
    border: none;
    background-color: #999;
    color: #fff;
  }
`;

export const RectangularBtn = styled(StyledButton)`

`;

export default StyledButton;