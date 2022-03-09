import React, { useEffect, useState } from 'react';
import { ICard, IColumn, IComment } from '../../models';
import { Modal } from '../../UIcomponents/Modal';
import { CardDetails } from '../CardDetails';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const initialData = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const [author, setAuthor] = useState('');
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [columns, setColumns] = useState<IColumn[]>([]); //columns
  const [cards, setCards] = useState<ICard[]>([]); // cards
  const [comments, setComments] = useState<IComment[]>([]); // comments

  useEffect(() => {
    if (localStorage.getItem('columns')) {
      setColumns(Array.from(JSON.parse(localStorage.getItem('columns')!)));
    } else {
      localStorage.setItem('columns', JSON.stringify(initialData));
      setColumns(initialData);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('cards')) {
      setCards(Array.from(JSON.parse(localStorage.getItem('cards')!)));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('comments')) {
      setComments(Array.from(JSON.parse(localStorage.getItem('comments')!)));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('author')) {
      setAuthor(JSON.parse(localStorage.getItem('author')!));
    } else {
      setModalActive('USER_SETTING');
    }
  }, []);

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  const selectCurrentCard = (card: ICard) => {
    setCurrentCard(card);
    setModalActive('CARD_DETAILS');
  };

  const updateColumns = (updatedColumn: IColumn) => {
    const updatedColumnsList = columns.map((el) => {
      return el.id === updatedColumn.id ? updatedColumn : el;
    });

    localStorage.setItem('columns', JSON.stringify(updatedColumnsList));
    setColumns(updatedColumnsList);
  };

  const addCardInCardList = (card: ICard) => {
    const updatedCardList = [card, ...cards];

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
    setCards(updatedCardList);
  };

  const deleteCardFromCardList = (event: React.MouseEvent<HTMLElement>, cardId: number) => {
    const updatedCardList = cards.filter((el) => el.id !== cardId);

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
    setCards(updatedCardList);
    event.stopPropagation();
  };

  const updateCardList = (updatedCard: ICard) => {
    const updatedCardList = cards.map((el) => {
      return el.id === updatedCard.id ? updatedCard : el;
    });

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
    setCards(updatedCardList);
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
                updateColumns={updateColumns}
                addCardInCardList={addCardInCardList}
                deleteCardFromCardList={deleteCardFromCardList}
                selectCurrentCard={selectCurrentCard}
                cards={cards}
              />
            );
          })}
        </ColumnsList>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings setAuthor={setAuthor} handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal visible={modalActive === 'CARD_DETAILS'} handleCloseModal={handleCloseModal}>
        <CardDetails
          author={author}
          currentCard={currentCard}
          columns={columns}
          comments={comments}
          updateCardList={updateCardList}
          addCommentToComments={addCommentToComments}
          updateComments={updateComments}
          deleteCommentFromComments={deleteCommentFromComments}
        />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
