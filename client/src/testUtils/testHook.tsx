import React from 'react';
import { mount } from 'enzyme';

type Callback = () => any;

const TestHook = ({ callback }: { callback: Callback}) => {
  callback();
  return null;
};

export const testHook = (callback: Callback) => {
  mount(<TestHook callback={callback} />)
};
