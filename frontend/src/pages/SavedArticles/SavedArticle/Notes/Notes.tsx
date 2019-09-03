import React from 'react'
import styled from 'styled-components';
import Note from './Note';

const StyledNotes = styled.div`
  grid-column: 2/ span 4;
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
  notes: Note[];
  deleteNote: (id: string) => void;
}

const Notes: React.FC<Props> = ({ notes, deleteNote }) => {
  return (
    <StyledNotes>
      {notes.map(note => <Note key={note._id} note={note} click={deleteNote} />)}
    </StyledNotes>
  )
}

export default Notes
