import React from 'react'
import styled from 'styled-components';
import Modal from '../../../../../../shared/Modal';
import Button from '../../../../../../shared/StyledElements/Button';

const SubmitBtn = styled(Button)`
  height: 3rem;
  cursor: pointer;
  font-weight: 600;
  grid-column: 1/ span 2;
`;

const StyledForm = styled.form`
  border: .04rem solid lightgray;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3rem;
  background: #fff;
  min-width: 32rem;
  min-height: 20rem;
  padding: 3rem;
  grid-gap: 1.2rem;
  textarea {
    border: .09rem solid #eee;
    background-color: #fff;
    min-height: 23.4rem;
    grid-column: 1/-1;
    grid-row: 1/2;
    resize: none;
    padding: 1rem;
    color: #718093;
  }
  .cancel-btn {
    grid-column: 3/4;
    border: none;
    font-size: 1.7rem;
    color: gray;
    background: none;
    text-decoration-line: underline;

    cursor: pointer;
    &:hover {
      color: #000;
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
        <textarea value={note} onChange={handleChange} autoFocus />
        <SubmitBtn as="input" btnType="filled" type="submit" value="Save"/>
        <button className="cancel-btn" onClick={cancel}>Cancel</button>
      </StyledForm>
    </Modal>
  )
}

export default EditNoteForm;
