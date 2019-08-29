import React from 'react'
import styled from 'styled-components';
import Modal from '../../shared';

const StyledModalContent = styled.div`
  background-color: #fff;
  display: grid;
  padding: 3rem;
  height: 11rem;
  border: .03rem solid lightgray;
  border-radius: 10px;
  width: 20rem;
  grid-gap: 1rem;
  grid-template-rows: 1fr min-content;
  align-items: end;
  h1 {
    text-shadow: 0px 6px 13px rgba(0, 0, 0, .3);
    align-self: start;
    grid-column: 1/ span 2;
    color: #2f3542;
    font-size: 2rem;
  }
  .btn {
    height: 3.4rem;
    cursor: pointer;
    transition: transform .1s ease;
    outline: none;
    &__primary {
      transition: transform .1s ease,
      color .2s,
      background-color .2 ease;
      background-color: transparent;
      border: .3rem solid var(--primary-color);
      border-radius: 20px;
      width: 10rem;
      color: var(--primary-color);
      grid-column: 1/2;
      &:hover {
        background-color: var(--primary-color);
        color: #fff;
        transform: translateY(-.1rem);
      }
      &:active {
        transform: translateY(.3rem);
      }
    }
    &__cancel {
      &:hover {
        text-decoration: underline;
      }
      color: gray;
      background-color: transparent;
      grid-column: 2/3;
      border: none;
    }
  }
`;

interface Props {
  isShown: boolean;
  hide: () => void;
  confirmationMsg?: string;
  description?: string;
  buttonValue: string;
  cancelBtnValue: string;
  deleteAction: () => void;
}

const DeleteModal: React.FC<Props> = ({
  isShown,
  hide,
  confirmationMsg = 'Are you sure you want to delete this?',
  description = null,
  buttonValue = 'Delete',
  cancelBtnValue = 'Cancel',
  deleteAction,
 }) => {
  return (
    <Modal show={isShown} hide={hide}>
      <StyledModalContent>
          <h1>{confirmationMsg}</h1>
          {
            description
            ? ''
            : <p>{description}</p>
          }
          <button className="btn btn__primary" onClick={deleteAction}>
            {buttonValue}
          </button>
          <button className="btn btn__cancel" onClick={hide}>
            {cancelBtnValue}
          </button>
      </StyledModalContent>
    </Modal>
  )
}

export default DeleteModal
