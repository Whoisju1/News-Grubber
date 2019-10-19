import React, { useContext, useState } from 'react'
import styled, { css, keyframes } from 'styled-components';
import { IArticle } from '../../../shared/contexts/scrappedArticlesContext';
import ArticleBtn from './ArticleBtn';
import { AddNoteIcon, TrashIcon, DownIcon } from '../../../shared/CustomIcons';
import AddNotesModal from '../../../components/AddNotesModal';
import DeleteModal from '../../../components/DeleteModal';
import { SavedArticlesCtx } from '../../../shared/contexts/savedArticlesContext';
import Notes from './Notes';
import { NotesCtx } from '../../../shared/contexts/notesContext';
import ArticleImg from '../../../components/ArticleImg';
import { Title, SubTitle } from '../../../shared/StyledElements/Heading';

const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-.3rem);
  }
  100% {
    opacity: 1;
    transform: translateY(.3rem);
  }
`;

const expand = keyframes`
  0% {
    transform: scale(.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;

  }
`;

const Info = styled.div`
  grid-column: span 9;
  align-content: start;
  display: grid;
  grid-row-gap: .5rem;
  grid-row: 1/-1;
  grid-auto-flow: row;
`;

interface StyledProps {
  hasNotes: boolean;
  notesExpanded: boolean;
}

const StyledContainer = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, max-content);
  grid-auto-rows: min-content;
  grid-gap: 1rem;
  grid-column-gap: 3rem;
  padding-bottom: 1rem;

  .image {
    grid-column: 1/2;
    grid-row: 1/ span 3;
  }

  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: var(--text-color__main);
  }

  .date {
    font-size: 1.2rem;
    justify-content: start;
  }

  & > *:nth-child(5) {
    grid-column: 2/3;
    grid-row: 4/span 1;
    height: 1.5rem;
  }

  .article-buttons {
    grid-column: 11/13;
    grid-gap: 2rem;
    display: grid;
    align-content: stretch;
    justify-content: right;
    grid-template-columns: repeat(auto-fit, minmax(1rem, 3rem));
    min-width: 5rem;
  }
  :not(:last-child) {
    border-bottom: .04rem solid lightgray;
  }

  .view-notes {
    display: grid;
    grid-template-columns: 2rem 1fr;
    grid-column: 1/2;
    grid-row: -2/-1;
    font-family: sans-serif;
    cursor: pointer;
    color: #999;
    text-transform: uppercase;
    font-size: 1.1rem;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    & svg {
      stroke: #999;
    }
    ${
      ({ notesExpanded}) =>
      !notesExpanded
      ? css`
        &:hover {
          & svg {
            animation: ${fadeDown} .6s ease-out infinite;
          }
        }
      `
      : css`
        & svg {
          transform: rotateX(180deg);
        }
      `
    }
  }
  position: relative;
  &::after {
    ${
      ({ hasNotes, notesExpanded }) =>
      (hasNotes && !notesExpanded)
        ? css`
          content: '';
          position: absolute;
          height: 100%;
          right: 103%;
          width: 3rem;
          background-color: var(--primary-color);
          z-index: 2;
          clip-path: circle(.5rem);
          animation: ${expand} .5s ease-out;
        `
      : ''
    }
  }
`;

interface Props extends IArticle { }

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
      <StyledContainer hasNotes={!!notes.length} notesExpanded={notesShown}>
        <a className="image" href={props.url} target="_blank" rel="noopener noreferrer">
          <ArticleImg hoverText="View Article" src={props.image} alt="article pic"/>
        </a>
        <Info>
          <a className="heading" href={props.url} target="_blank" rel="noopener noreferrer">
            <Title>{props.title}</Title>
            <SubTitle>{props.subTitle}</SubTitle>
          </a>
          <a href={props.author.authorInfo} className="author" target="_blank" rel="noopener noreferrer">{props.author.name}</a>
          <div className="date">{date} {time}</div>
        </Info>
          {
            hasNotes &&
            <div onClick={() => setNotesShown(!notesShown)} className="view-notes" title="View Notes">
                <DownIcon preserveAspectRatio="xMinYMid meet" />
                { !notesShown ? 'View Notes' : 'Hide Notes'}
            </div>
          }
          <div className="article-buttons">
          <ArticleBtn click={addNoteModalManager.show} title="Add note about article">
            <AddNoteIcon preserveAspectRatio="xMaxYMid meet" />
          </ArticleBtn>
          <ArticleBtn click={deleteModalManager.show} title="Delete this article">
            <TrashIcon preserveAspectRatio="xMaxYMid meet" />
          </ArticleBtn>
        </div>
      </StyledContainer>
      { notesShown && <Notes /> }
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
