import React from 'react'
import styled from 'styled-components';
import Modal from '../../../../../../shared/Modal';

const StyledForm = styled.form`
  border: .04rem solid lightgray;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  min-width: 35rem;
  min-height: 20rem;
  padding: 2.5rem;
  grid-gap: .5rem;
  textarea {
    width: 100%;
    min-height: 23.4rem;
    grid-column: 1/-1;
    resize: none;
  }
  input[type="submit"] {
    grid-column: 1/2;
    border: .3rem solid var(--primary-color);
    border-radius: 8px;
    background: transparent;
    color: var(--primary-color);
    &:hover {
      background-color: var(--primary-color);
      cursor: pointer;
      color: #fff;
    }
  }
  .cancel-btn {
    grid-column: 2/3;
    border: none;
    border-radius: 8px;
    color: gray;
    background: none;
    border: .3rem solid gray;
    cursor: pointer;
    &:hover {
      text-decoration-line: underline;
    }
  }
`;

interface Props {
  submit: (note: string) => void;
  note: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  cancel: () => void;
  isShown: boolean;
}

const EditNoteForm: React.FC<Props> = ({  submit, note, handleChange, cancel, isShown }) => {
  return (
    <Modal show={isShown} hide={cancel}>
      <StyledForm onSubmit={(e) => {
        e.preventDefault();
        submit(note)
      }}>
        <label htmlFor="note"></label>
        <textarea value={note} onChange={handleChange}/>
        <input type="submit" value="Save"/>
        <button className="cancel-btn" onClick={cancel}>Cancel</button>
      </StyledForm>
    </Modal>
  )
}

export default EditNoteForm;
