import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components';
import formatDistance from "date-fns/formatDistance";
import { MenuIcon } from '../../../../../shared/CustomIcons';
import EditNoteForm from './EditNoteFrom';
import { NotesCtx } from '../../../../../shared/contexts/notesContext';
import DropDown from '../../../../../components/DropDown';

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledNote = styled.div`
  border: .04rem solid lightgray;
  padding: 1.4rem 1.4rem 1.4rem 1.4rem;
  border-radius: 10px;
  margin: 1rem 0;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: min-content auto 3.5rem;
  position: relative;
  grid-row-gap: 1rem;
  justify-content: right;
  animation: ${appear} .2s both linear;
  .date-created {
    display: inline-grid;
    font-size: 1.2rem;
    max-width: 10rem;
    color: #2f3542;
    background-image: var(--secondary-background-color);
    grid-column: 2/-1;
    justify-self: end;
    grid-row: 3/4;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    align-content: center;
    text-align: center;
    padding: 1.2rem 1.2rem;
  }
  p.body {
    grid-column: 1/-1;
    grid-row: 1/3;
    width: 97%;
    text-align: justify;
  }

  .buttons {
    display: grid;
    grid-column: 2/-1;
    grid-row: 1/2;
    width: 5.5rem;
    justify-self: end;
    & svg {
      height: 3rem;
      width: 3rem;
      transform: translateX(84%);
    }
    &:hover circle,
    &:active circle,
    &:focus {
      transition: transform .04s ease-out;
      &:first-child {
        transform: translateY(-7px);
      }
      &:last-child {
        transform: translateY(7px);
      }
    }
    .close-btn,
    .edit-btn {
      height: auto;
      cursor: pointer;
      height: 1.8rem;
      width: 1.8rem;
    }
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
        <a className="buttons">
          <DropDown Head={<MenuIcon />} menuWidth="7rem" >
            <div onClick={() => setEditNote(true)}>Edit</div>
            <div onClick={() => deleteNote(_id)}>Delete</div>
          </DropDown>
        </a>
        <p className="body">{noteState}</p>
        <span className="date-created">
          {`${formatDistance(new Date(createdAt), Date.now())} ago`}
        </span>
      </StyledNote>
    </>
  );
};

export default Notes
