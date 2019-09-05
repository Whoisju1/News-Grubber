import React from 'react'
import Svg from '../Svg';

const AddNoteIcon = () => {
  return (
    <Svg viewBox="0 0 100 100" preserveAspectRatio="xMinYMid meet">
      <title>Add Note</title>
      <symbol
        id="note-pad"
        viewBox="0 0 100 100"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="rgb(101, 119, 134)"
        strokeWidth="6">
      <path
        id="outline"
        d="
          M75,47
          V10
          H30
          L10,30
          V85
          H45
        "
      />
      <path
        id="fold"
        d="
          M30,10
          V30
          H10
        "
      />
      <line x1="45" y1="30" x2="60" y2="30"/>
      <line x1="25" y1="47" x2="60" y2="47"/>
      <line x1="25" y1="65" x2="45" y2="65"/>
      <circle cx="75" cy="76" r="21" stroke="none" fill="rgb(101, 119, 134)" />
      <path
        stroke="#fff"
        fill="none"
        d="
          M75,66
          V86
          M65,75
          H86
        "
      />
    </symbol>
    <use xlinkHref="#note-pad" />
    </Svg>
  );
};

export default AddNoteIcon
