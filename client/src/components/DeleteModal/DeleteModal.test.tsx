import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteModal, { IProps } from './DeleteModal';

describe('Delete Modal', () => {
  const initialProps: IProps = {
    isShown: true,
    hide: jest.fn(),
    confirmationMsg: 'To delete or not to delete',
    description: 'description',
    buttonValue: 'Delete',
    cancelBtnValue: 'Forget about it',
    deleteAction: jest.fn(),
  }
  const setup = (props: IProps = initialProps) => mount(
    <DeleteModal { ...props } />
  );

  it('should display `description` value in "p" element', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').first().text()).toBe(initialProps.description);
  });

  it('should not display the `description` value if the description prop isn\'t passed in', () => {
    const props = Object.assign({}, initialProps);
    Reflect.deleteProperty(props, 'description');
    const wrapper = setup(props);
    expect(wrapper.find('p').length).toBe(0);
  });

  it('should display confirmation message passed in through the `confirmationMsg` prop', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').text()).toBe(initialProps.confirmationMsg);
  });

  describe('Cancel Button', () => {
    const wrapper = setup();
    const cancelBtn = wrapper.find('button').at(1);
    it('should invoke hide function when cancel delete button is clicked', () => {
      cancelBtn.simulate('click');
      expect(initialProps.hide).toBeCalled();
    });

    it('should show `cancelBtnValue` prop value in button', () => {
      expect(cancelBtn.text()).toBe(initialProps.cancelBtnValue);
    });
  })

  describe('Delete Button', () => {
    const wrapper = setup();

    const deleteBtn = wrapper.find('button').at(0);
    it('should have text passed down through `buttonValue` prop', () => {
      expect(deleteBtn.text()).toBe(initialProps.buttonValue);
    });

    it('should call `deleteAction` prop when clicked', () => {
      deleteBtn.simulate('click');
      expect(initialProps.deleteAction).toBeCalled();
    });
  })

});