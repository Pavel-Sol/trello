import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ICard, IColumn, IComment } from '../../models';
import { Modal } from '../../UIcomponents/Modal';
import { CardDetails } from '../CardDetails';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const damyData = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const [storedValue, setValue] = useLocalStorage('autorName');
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [columns, setColumns] = useState<Array<IColumn>>([]); //колонки
  const [cards, setCards] = useState<Array<ICard>>([]); //карточки
  const [comments, setComments] = useState<Array<IComment>>([]); //комментарии

  useEffect(() => {
    // вытаскиваем список колонок из LS, если нет, берем готовые
    if (localStorage.getItem('columns')) {
      setColumns(Array.from(JSON.parse(localStorage.getItem('columns')!)));
    } else {
      localStorage.setItem('columns', JSON.stringify(damyData));
      setColumns(damyData);
    }
  }, []);

  useEffect(() => {
    // вытаскиваем список карточек
    if (localStorage.getItem('cards')) {
      setCards(Array.from(JSON.parse(localStorage.getItem('cards')!)));
    }
  }, []);

  useEffect(() => {
    // вытаскиваем список комментариев
    if (localStorage.getItem('comments')) {
      setComments(Array.from(JSON.parse(localStorage.getItem('comments')!)));
    }
  }, []);

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  useEffect(() => {
    if (!storedValue) {
      setModalActive('USER_SETTING');
    }
  }, [storedValue]);

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
        <UserSettings setValue={setValue} handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal visible={modalActive === 'CARD_DETAILS'} handleCloseModal={handleCloseModal}>
        <CardDetails
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
