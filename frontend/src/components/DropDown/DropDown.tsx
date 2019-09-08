import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { handleOutsideClick } from '../../utils/handleOutsideClick';

const drop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-4rem) scaleX(.2);
  }
  50% {
    transform: scaleX(.7);
  }
  80% {
    transform: scaleX(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const momentum = keyframes`
  0% {
    transform: translateX(.4rem);
  }
  80% {
    transform: translateX(-.2rem);
  }
  100% {
    transform: translateX(0rem);
  }
`;

type Position = 'left' | 'right' | 'center'

interface StyledProps {
  position?: Position;
  width?: string;
}

const StyledDropDown = styled.div<StyledProps>`
  display: inline-grid;
  height: 100%;
  width: 100%;
  position: relative;
  .menu {
    position: absolute;
    right: 1rem;
    top: 88%;
    align-items: center;
    background-color: #fff;
    border: .04rem solid #dcdde1;
    box-shadow: 0.4rem .5rem .8rem rgba(0, 0, 0, .2);
    border-radius: 3px;

    /* DROP ANIMATION */
    transform-origin: 100% 0%;
    animation: ${drop} .1s both linear;
    & > * {
      height: 4rem;
      display: grid;
      width: ${(props) => props.width || '15rem'};
      align-items: center;
      padding: 0 1rem;
      cursor: pointer;
      animation: ${momentum} .2s both ease-out;
      animation-delay: .1s;
      &:hover {
        color: #FFF;
        background-color: var(--primary-color);
      }
    }
  }

  .head {
    cursor: pointer;
  }

  .hide {
  }

  .show {
  }
`;

interface Props {
  children: React.ReactNode;
  Head: React.ReactNode | JSX.Element[];
  menuWidth?: string;
}

const DropDown: React.FC<Props> = ({ children, Head, menuWidth }) => {
  const menuRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const hide = () => {
    setShow(false);
  };


  const closeMenuOnOutsideClick = handleOutsideClick(menuRef, hide);

  useEffect(() => {
    document.body.addEventListener('click', closeMenuOnOutsideClick)
    return () => {
      document.body.removeEventListener('click', closeMenuOnOutsideClick)
    };
  }, [])

  return (
    <StyledDropDown ref={menuRef as any} width={menuWidth}>
      <div className="head" onClick={() => setShow(!show)}>
        {Head}
      </div>
      {
        show ? <div className={`menu ${show ? 'hide' : 'show' }`} onClick={hide}>
        {children}
      </div> : null
      }
    </StyledDropDown>
  );
};

export default DropDown;
