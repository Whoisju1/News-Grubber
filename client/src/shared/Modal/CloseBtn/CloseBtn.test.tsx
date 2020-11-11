import React from 'react';
import CloseBtn, { IProps } from './CloseBtn';
import { shallow } from 'enzyme';

describe('CloseBtn', () => {
  const setup = (props: IProps) => shallow(
    <CloseBtn  {...props}  />
  );

  it('should have a title of `Close`', () => {
    const wrapper = setup({ click: () => void(0) });
    expect(wrapper.find('title').text()).toBe('Close');
  });

  it('should execute the `click` prop when clicked', () => {
    const clickMock = jest.fn();
    const wrapper = setup({ click: clickMock });
    wrapper.simulate('click');
    expect(clickMock).toHaveBeenCalled();
  });
});