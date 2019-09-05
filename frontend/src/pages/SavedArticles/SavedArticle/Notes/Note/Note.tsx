import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import formatDistance from "date-fns/formatDistance";
import { CloseBtn, EditIcon } from '../../../../../shared/CustomIcons';
import EditNoteForm from './EditNoteFrom';
import { editNoteRequest } from '../../../../../utils/requests';
import { NotesCtx } from '../../../../../shared/contexts/notesContext';

const StyledNote = styled.form`
  border: .04rem solid lightgray;
  padding: 1rem 2.5rem 2rem 2.5rem;
  border-radius: 10px;
  margin: 1rem 0;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.7rem auto 3.5rem;
  position: relative;
  grid-gap: 2rem;

  .date-created {
    display: inline-block;
    font-size: 1.2rem;
    padding: 1rem .5rem;
    color: #2f3542;
    grid-column: 2/3;
    grid-row: 3/4;
    text-align: right;
    border-radius: 30px;
    background-color: #CDCDCD;
    text-align: center;
  }
  p {
    grid-column: 1/-1;
    grid-row: 2/3;
    text-align: justify;
  }

  .close-btn {
    width: 1.7rem;
    height: auto;
    cursor: pointer;
  }

  .edit-btn {
    right: .8rem;
    width: 1.7rem;
    height: auto;
    cursor: pointer;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1.7rem);
    justify-content: right;
    grid-gap: 1rem;
    grid-column: 2/3;
    grid-row: 1/2;
  }
`;

interface Props {
  note: {
    _id: string;
    body: string;
    createdAt: string;
    updatedAt: string;
  };
}

const Notes: React.FC<Props> = ({ note }) => {
  const { _id, body, createdAt } = note;
  const { updateNote, deleteNote } = useContext(NotesCtx)
  const [noteState, setNoteState] = useState(body);
  const [editNote, setEditNote] = useState(false);
  return (
    <>
      {
        editNote
        ? <EditNoteForm
            isShown={editNote}
            cancel={async () => {
              await updateNote(_id, noteState);
              setEditNote(false);
            }}
            note={noteState}
            submit={() => {
              updateNote(_id, noteState);
              setEditNote(false);
            }}
            handleChange={(e) => setNoteState(e.target.value)}
          />
          : null
      }
      <StyledNote>
        <div className="buttons">
          <div className="close-btn"  onClick={() => deleteNote(_id)} title="Delete Note">
            <CloseBtn />
          </div>
          <div className="edit-btn" title="Edit Note" onClick={() => setEditNote(true)}>
            <EditIcon />
          </div>
        </div>
        <p>{noteState}</p>
        <span className="date-created">
          {`${formatDistance(new Date(createdAt), Date.now())} ago`}
        </span>
      </StyledNote>
    </>
  );
};

export default Notes
