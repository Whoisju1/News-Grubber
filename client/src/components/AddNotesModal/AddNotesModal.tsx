import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../shared';

const StyledForm = styled.form`
  display: grid;
  padding: 2rem;
  background-color: #FFF;
  border: .04rem solid lightgray;
  border-radius: 5px;
  min-width: 40rem;
  grid-row-gap: 1rem;
  box-shadow: 0 5px 5px 0 rgba(154,160,185,.05), 0 5px 30px 0 rgba(166,173,201,.22);
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
    font-weight: 700;
    color: #2b2d38;
  }
  textarea {
    background: #f1f2f6;
    border: 1px solid #e4e6f2;
    border-radius: 5px;
    outline: none;
    padding: .5rem 1rem;
  }
  input[type=submit] {
    border-radius: 50px;
    border: none;
    background-color: #e95a4b;
    color: #fff;
    outline: none;
    height: 4.5rem;
    cursor: pointer;
    font-family: sans-serif;
  }
`;

export interface IProps {
  hide: () => void;
  isShown: boolean;
  submit: (note: string) => void;
}

const AddNotesModal: React.FC<IProps> = ({ hide, isShown, submit }) => {
  const [note, setNote] = useState('');

  return (
    <Modal
      hide={hide}
      show={isShown}
    >
      <StyledForm onSubmit={async (e) => {
        e.preventDefault();
        await submit(note);
      }}>
        <h1>Add Notes</h1>
        <textarea
          value={note}
          id="add-note"
          onChange={(e) => {
            const { value } = e.currentTarget;
            setNote(value);
          }}
          cols={30}
          rows={10}></textarea>
        <input type="submit" value="Save"/>
      </StyledForm>
    </Modal>
  )
}

export default AddNotesModal;
