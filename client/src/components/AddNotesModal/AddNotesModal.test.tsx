import React from 'react'
import { shallow, mount } from 'enzyme';
import AddNoteModal, { IProps } from './AddNotesModal';
import { act } from 'react-test-renderer';
import Modal from '../../shared';

describe('AddNoteModal', () => {
  const initialProps: IProps = {
    hide: jest.fn,
    isShown: true,
    submit: jest.fn(),
  }
  const setup = (props: IProps = initialProps) => mount(
    <AddNoteModal { ...props } />
  );
  it('should call the submit prop upon form submission', () => {
    const note = 'This is the best note in the whole wide world';
    const event = { currentTarget: { value: note }};
    const wrapper = setup();
    (wrapper.find('textarea').instance() as any).value = note;
    wrapper.find('textarea').simulate('change', event);
    wrapper.find('form').simulate('submit');
    expect(initialProps.submit).toHaveBeenCalledWith(note);
  });
});
