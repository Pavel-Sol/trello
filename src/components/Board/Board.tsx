import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICard, IColumn, IComment } from '../../models';
import { selectAuthor } from '../../store/ducks/author';
import { selectColumns } from '../../store/ducks/column';
import { Modal } from '../../UIcomponents/Modal';
import { CardDetails } from '../CardDetails';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const authorName: string = useSelector(selectAuthor);
  const columns: Array<IColumn> = useSelector(selectColumns); //columns
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [comments, setComments] = useState<IComment[]>([]); // comments

  useEffect(() => {
    if (localStorage.getItem('comments')) {
      setComments(Array.from(JSON.parse(localStorage.getItem('comments')!)));
    }
  }, []);

  useEffect(() => {
    // проверяем, есть ли имя автора
    if (!authorName) {
      setModalActive('USER_SETTING');
    }
  }, [authorName]);

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  const selectCurrentCard = (card: ICard) => {
    setCurrentCard(card);
    setModalActive('CARD_DETAILS');
  };

  const addCommentToComments = (comment: IComment) => {
    const updatedCommentList = [comment, ...comments];

    localStorage.setItem('comments', JSON.stringify(updatedCommentList));
    setComments(updatedCommentList);
  };

  const updateComments = (updatedComment: IComment) => {
    const updatedCommentList = comments.map((el) => {
      return el.id === updatedComment.id ? updatedComment : el;
    });

    localStorage.setItem('comments', JSON.stringify(updatedCommentList));
    setComments(updatedCommentList);
  };

  const deleteCommentFromComments = (commentId: number) => {
    const updatedCommentList = comments.filter((el) => el.id !== commentId);

    localStorage.setItem('comments', JSON.stringify(updatedCommentList));
    setComments(updatedCommentList);
  };

  return (
    <BoardStyled>
      <Container>
        <ColumnsList>
          {columns.map((column) => {
            return (
              <Column
                comments={comments}
                key={column.id}
                columnData={column}
                selectCurrentCard={selectCurrentCard}
              />
            );
          })}
        </ColumnsList>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal visible={modalActive === 'CARD_DETAILS'} handleCloseModal={handleCloseModal}>
        <CardDetails
          currentCard={currentCard}
          columns={columns}
          comments={comments}
          addCommentToComments={addCommentToComments}
          updateComments={updateComments}
          deleteCommentFromComments={deleteCommentFromComments}
        />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
