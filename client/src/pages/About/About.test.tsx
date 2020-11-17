import React from 'react';
import About from './About';
import { shallow } from 'enzyme';

describe('About', () => {
  const setup = () => shallow(<About />);
  it('should match snapshot', () => {
    const wrapper = setup();
    expect(wrapper.html()).toMatchSnapshot();
  });
})
