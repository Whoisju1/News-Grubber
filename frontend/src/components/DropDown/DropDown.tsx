import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { handleOutsideClick } from '../../utils/handleOutsideClick';

const drop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledDropDown = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  position: relative;
  .menu {
    position: absolute;
    top: 100%;
    width: 22rem;
    display: grid;
    align-items: center;
    background-color: #fff;
    border: .04rem solid #dcdde1;
    box-shadow: 0.4rem .5rem .8rem rgba(0, 0, 0, .2);

    /* DROP ANIMATION */
    animation: ${drop} .1s both linear;
    & > * {
      height: 4rem;
      display: grid;
      align-items: center;
      padding: 0 1rem;
      cursor: pointer;
      &:hover {
        color: #FFF;
        background-color: var(--primary-color);
      }
    }
  }

  .head {
    cursor: pointer;
    border: 1px solid black;
  }

  .hide {
  }

  .show {
  }
`;

interface Props {
  children: React.ReactNode;
  Head: React.ReactNode | JSX.Element[];
}

const DropDown: React.FC<Props> = ({ children, Head }) => {
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
    <StyledDropDown ref={menuRef as any}>
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
