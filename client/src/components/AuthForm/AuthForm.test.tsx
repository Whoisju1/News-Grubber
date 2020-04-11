import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthForm, { IProps } from './AuthForm';
import { act } from 'react-test-renderer';

describe('AuthForm', () => {
  const initialProps: IProps = {
    formHeading: 'Sign Up Form',
    handleSubmit: jest.fn(),
    submitBtnValue: 'Sign up',
  }

  const fieldValues = {
    username: 'username',
    password: 'password',
  };

  const setup = (props: IProps = initialProps) => mount(<AuthForm { ...props } />)

  it('should should be defined', () => {
    expect(AuthForm).toBeDefined();
  });

  it('should evoke the submit event handler with correct values', () => {
    const wrapper = setup();
    Object.entries(fieldValues).forEach(([key, value]) => {
      const input = wrapper.find(`input[name="${key}"]`);
      (input.instance() as any as HTMLInputElement).value = value;
      (input.instance() as any as HTMLInputElement).name = key;
      input.simulate('change');
    });
    wrapper.find('form').simulate('submit');
    expect(initialProps.handleSubmit).toBeCalledWith(fieldValues);
  });

  it('should Form to have correct heading', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').first().text()).toBe(initialProps.formHeading);
  });

  it('should should render submission button with correct value', () => {
    const wrapper = setup();
    expect(wrapper.find('input[type="submit"]').prop('value')).toBe(initialProps.submitBtnValue);
  });
});
