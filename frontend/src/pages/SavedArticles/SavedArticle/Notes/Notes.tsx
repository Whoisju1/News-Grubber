import React, { useReducer, useEffect, useContext } from 'react'
import styled from 'styled-components';
import Note from './Note';
import { fetchArticleNotes, editNoteRequest, deleteNote as dltNote, addNote } from '../../../../utils/requests';
import { NotesCtx } from '../../../../shared/contexts/notesContext';

const StyledNotes = styled.div`
  grid-column: 1/ -1;
  border-left: .2rem solid lightgray;
  padding-left: 1rem;
`;

interface Note {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
}

const Notes: React.FC<Props> = () => {
  const { notes } = useContext(NotesCtx);
  return (
    <StyledNotes>
      {notes.map(note => <Note key={note._id} note={note} />)}
    </StyledNotes>
  )
}

export default Notes
