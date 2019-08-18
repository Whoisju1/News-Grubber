import { mount } from 'enzyme'
import Modal from './Modal';
import React from 'react';

describe('Modal', () => {
  const show = true;
  const modal = mount(<Modal show={show}><div /></Modal>);
  it('should be rendered', () => {
    expect(modal).toHaveLength(1);
  });
});