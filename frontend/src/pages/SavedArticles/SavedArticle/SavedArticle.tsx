import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';
import ArticleBtn from './ArticleBtn';
import { AddNoteIcon, TrashIcon, MenuIcon } from '../../../shared/CustomIcons';
import AddNotesModal from '../../../components/AddNotesModal';
import DeleteModal from '../../../components/DeleteModal';
import { SavedArticlesCtx } from '../../../shared/contexts/savedArticlesContext';
import { addNote, fetchArticleNotes, deleteNote } from '../../../utils/requests';
import Notes from './Notes';
import { NotesCtx } from '../../../shared/contexts/notesContext';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, min-content);
  grid-auto-rows: min-content;
  grid-gap: .6rem;
  a,
  a:active,
  a:link,
  a:visited {
    text-decoration: none;
  }
  .image {
    grid-column: 1/2;
    grid-row: 1/ span 4;
  }

  .heading {
    grid-column: 2/13;
    display: grid;
    grid-gap: .1rem;
    h1 {
      font-size: 1.9rem;
    }
  }
  .author {
    grid-column: 2/5;
  }
  .date {
    display: grid;
    align-items: end;
    grid-column: 2/5;
    font-size: 1.4rem;
  }

  & > *:nth-child(5) {
    grid-column: 2/3;
    grid-row: 4/span 1;
    height: 1.5rem;
    /* transform: translateY(-1.3rem); */
    /* border: .04rem solid gray; */
  }

  .article-buttons {
    grid-column: 11/13;
    grid-row: 3/4;
    /* height: 3rem; */
    grid-gap: 2rem;
    display: grid;
    justify-content: right;
    grid-template-columns: repeat(auto-fit, minmax(1rem, 3rem));
    /* transform: translateY(-.6rem); */
    min-width: 5rem;
  }
  :not(:last-child) {
    border-bottom: .04rem solid lightgray;
  }
`;

interface Props extends IArticle { }
interface INote {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface ModalRegistry {
  [x: string]: boolean;
}


const SavedArticle: React.FC<Props> = (props) => {
  const deleteModalId = `${DeleteModal.name}-${props._id}`;
  const addNoteModalId = `${AddNotesModal.name}-${props._id}`;

  const [modal, setModal] = useState<ModalRegistry>({
    [deleteModalId]: false,
    [addNoteModalId]: false,
  });
  const { deleteArticle } = useContext(SavedArticlesCtx);
  const [notesShown, setNotesShown] = useState(false);
  const { notes, createNote } = useContext(NotesCtx);

  const hasNotes = !!notes.length;

  const createModalManager = (modalId: string) => {
    return ({
      hide: () => setModal({ ...modal, [modalId]: false }),
      show: () => setModal({ ...modal, [modalId]: true }),
      isShown: modal[modalId as any as string],
    });
  };

  const deleteModalManager = createModalManager(deleteModalId);
  const addNoteModalManager = createModalManager(addNoteModalId);

  const removeArticle = async () => {
    await deleteArticle(props._id);
    deleteModalManager.hide();
  };

  const { date, time } = props.publicationDate;
  return (
    <>
      <StyledContainer>
        <a className="image" href={props.url} target="_blank" rel="noopener noreferrer">
          <img src={props.image} alt="article pic"/>
        </a>
        <a className="heading" href={props.url} target="_blank" rel="noopener noreferrer">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">{props.subTitle}</h2>
        </a>
        <a href={props.author.authorInfo} className="author" target="_blank" rel="noopener noreferrer">{props.author.name}</a>
        <div className="date">{date} {time}</div>
        {
          hasNotes &&
          <ArticleBtn click={() => setNotesShown(!notesShown)} title="View Notes">
              <MenuIcon preserveAspectRatio="xMinYMid meet" />
          </ArticleBtn>
        }
        <div className="article-buttons">
          <ArticleBtn click={addNoteModalManager.show} title="Add note about article">
            <AddNoteIcon />
          </ArticleBtn>
          <ArticleBtn click={deleteModalManager.show} title="Delete this article">
            <TrashIcon preserveAspectRatio="xMidYMid" />
          </ArticleBtn>
        </div>
        { notesShown && <Notes /> }
      </StyledContainer>
      {
        deleteModalManager.isShown
          ? <DeleteModal
              hide={deleteModalManager.hide}
              isShown={deleteModalManager.isShown}
              buttonValue="Delete Article"
              confirmationMsg="Are you sure you want to delete this article?"
              cancelBtnValue="Cancel"
              deleteAction={removeArticle}
            />
          : null
      }
      {
        addNoteModalManager.isShown
          ? <AddNotesModal
              hide={addNoteModalManager.hide}
              isShown={addNoteModalManager.isShown}
              submit={async (body: string) => {
                await createNote(body);
                addNoteModalManager.hide();
              }}
            />
          : null
      }
    </>
  );
};

export default SavedArticle;
