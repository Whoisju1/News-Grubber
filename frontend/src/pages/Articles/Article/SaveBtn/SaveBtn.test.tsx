import React from 'react';
import { shallow } from 'enzyme';
import SaveBtn from './SaveBtn';

describe('`SaveBtn`', () => {
  const saveFunc = jest.fn();
  const wrapper = shallow(
    <SaveBtn click={saveFunc}>
      Save
    </SaveBtn>
  );
  it('should render children', () => {
      expect(wrapper.text()).toBe('Save');
    });

    it('`click` function should be executed when `SaveBtn` is clicked', () => {
      wrapper.simulate('click');
      expect(saveFunc).toBeCalled();
      saveFunc.mockClear();
    });
});