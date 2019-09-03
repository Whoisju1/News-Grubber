import React from 'react'
import styled from 'styled-components';
import { format } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import { CloseBtn } from '../../../../../shared/CustomIcons';

const StyledNote = styled.div`
  border: .04rem solid lightgray;
  padding: 2rem;
  border-radius: 10px;
  margin: 1rem 0;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows:  1fr min-content;
  position: relative;

  .date-created {
    font-size: 1.2rem;
    color: #999;
    grid-column: 2/3;
    grid-row: 2/3;
    text-align: right;
    transform: translateY(1.5rem);
  }
  p {
    grid-column: 1/-1;
    grid-row: 1/2;
  }

  .close-btn {
    position: absolute;
    right: .8rem;
    top: .5rem;
    width: 1.3rem;
    height: auto;
    cursor: pointer;
  }
`;

interface Props {
  note: {
    _id: string;
    body: string;
    createdAt: string;
    updatedAt: string;
  };
  click: (id: string) => void;
}

const Notes: React.FC<Props> = ({ note, click }) => {
  const { _id, body, createdAt, updatedAt } = note;
  return (
    <StyledNote>
      <div className="close-btn"  onClick={() => click(_id)}>
        <CloseBtn />
      </div>
      <p>{body}</p>
      <span className="date-created">
        {`${formatDistance(new Date(createdAt), Date.now())} ago`}
      </span>
    </StyledNote>
  );
};

export default Notes
