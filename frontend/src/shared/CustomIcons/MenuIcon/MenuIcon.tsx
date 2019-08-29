import React from 'react';
import Svg from '../Svg';

interface Props {

}

const MenuIcon: React.FC<Props> = () => {
  return (
    <Svg preserveAspectRatio="xMaxYMid meet" viewBox="0 -20 100 90">
      <symbol
      id="menu-icon"
      viewBox="0 0 100 100"
      stroke="rgb(101, 119, 134)"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="6">
        <path
          fill="none"
          d="M0,0 L50,55 100,0"
        ></path>
    </symbol>
    <use xlinkHref="#menu-icon" />
    </Svg>
  );
};

export default MenuIcon;
