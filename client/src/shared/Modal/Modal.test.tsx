import React from 'react'
import { shallow, mount } from 'enzyme';
import Modal, { IProps } from './Modal';
import CloseBtn from './CloseBtn';

describe('Modal Component', () => {
  const initialProps: IProps = {
    children: <div />,
    hide: jest.fn(() => console.log('hello world')),
    show: true,
    showCloseBtn: true,
  };

  const setup = <T extends Partial<IProps>>(props?: T) => {
    const passedProps = { ...initialProps, ...props };
    return shallow(
      <Modal { ...passedProps }>
        <div>Modal Content</div>
      </Modal>
    );
  };

  it('should call the hide prop when the closed button is clicked.', () => {
    const props: Partial<IProps> = { hide: jest.fn(), show: true };
    const wrapper = mount(
      <Modal { ...props as IProps }>
        <div className="modal-child"></div>
      </Modal>
    );

    wrapper.find(CloseBtn).simulate('click');
    expect(props.hide).toHaveBeenCalled();
  });

  it('should call the hide prop when the `Escape` is pressed', () => {
    const map = {} as any;
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const props: Partial<IProps> = { hide: jest.fn(), show: true };
    const wrapper = mount(
      <Modal { ...props as IProps }>
        <div className="child-elements"></div>
      </Modal>
    );
    map.keyup({ key: 'Escape' });
    expect(props.hide).toHaveBeenCalled();
  });

  it('should it should have a close button when `showCloseButton` prop is set to `true`', () => {
    const wrapper = setup({ showCloseBtn: true });
    expect(wrapper.find(CloseBtn)).toHaveLength(1);
  });

  it('should it should note have the close button when `showCloseButton` prop is set to `false`', () => {
    const wrapper = setup({ showCloseBtn: false });
    expect(wrapper.find(CloseBtn)).toHaveLength(0);
  });

  it('should render children', () => {
    const props: Partial<IProps> = { hide: jest.fn(), show: true };
    const wrapper = mount(
      <Modal { ...props as IProps }>
        <div className="modal-child">Modal Content</div>
      </Modal>
    );
    expect(wrapper.find('.content .modal-child')).toHaveLength(1);
    expect(wrapper.find('.modal-child').text()).toBe('Modal Content');
  });
});

