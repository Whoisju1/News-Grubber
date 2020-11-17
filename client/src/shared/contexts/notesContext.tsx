import React, { useReducer, useEffect, createContext, useContext } from 'react'
import {
  fetchArticleNotes,
  editNoteRequest,
  addNote,
  deleteNote as dltNote,
} from '../../utils/requests';

export interface INote {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoteCtx {
  createNote: (note: string) => void;
  deleteNote: (noteId: string) => void;
  updateNote: (noteId: string, body: string) => void;
  getNotes: () => void;
  notes: INote[];
}

export const NotesCtx = createContext<INoteCtx>({
  createNote: () => void(0),
  deleteNote: () => void(0),
  getNotes: () => void(0),
  updateNote: () => void(0),
  notes: [],
});

interface Action {
  type: 'get_notes' | 'update_note' | 'delete_note' | 'createNote';
  payload: INote[];
}

interface Props {
  articleId: string;
}

const NotesProvider: React.FC<Props> = ({ articleId, children }) => {
  const [notes, dispatch] = useReducer((state: INote[], action: Action) => {
    switch (action.type) {
      case 'get_notes':
        return action.payload;
      case 'createNote':
        return action.payload;
      case 'update_note':
        return action.payload;
      case 'delete_note':
        return action.payload;
      default:
        return state;
    }
  }, []);

  const getNotes = async () => {
    const notes = await fetchArticleNotes(articleId);
    dispatch({
      type: 'get_notes',
      payload: notes,
    });
  };

  const updateNote = async (noteId: string, body: string) => {
    const editedNote = await editNoteRequest(noteId, articleId, body);
    const notesCopy = ([] as INote[]).concat(notes);
    const noteIndex = notesCopy.findIndex((item: INote) => item._id === noteId);
    notesCopy[noteIndex] = editedNote;
    dispatch({
      type: 'update_note',
      payload: notesCopy,
    })
  };
  const deleteNote = async (noteId: string) => {
    const deletedNote = await dltNote(noteId, articleId);
    dispatch({
      type: 'delete_note',
      payload: notes.filter(({ _id }) => _id !== deletedNote._id),
    });
  };

  const createNote = async (note: string) => {
    const newNote = await addNote(articleId, note);
    dispatch({
      type: 'createNote',
      payload: [...notes, newNote]
    })
  };

  useEffect(() => {
    (async () => {
      await getNotes();
    })()
  }, [JSON.stringify(notes)]);

  return (
    <NotesCtx.Provider value={{
      notes,
      updateNote,
      createNote,
      deleteNote,
      getNotes,
    }}>
      {children}
    </NotesCtx.Provider>
  );
};

const useNotes = () => useContext(NotesCtx);

export {
  useNotes,
  NotesProvider,
};
