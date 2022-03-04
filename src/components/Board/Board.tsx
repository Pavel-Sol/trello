import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ICard, IColumn, IComment } from '../../models';
import { Modal } from '../../UIcomponents/Modal';
import { CardDetails } from '../CardDetails';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const damyData = [
  { id: 0, title: 'TODO', cardIds: [] },
  { id: 1, title: 'In Progress', cardIds: [] },
  { id: 2, title: 'Testing', cardIds: [] },
  { id: 3, title: 'Done', cardIds: [] },
];

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const [currentCardDetails, setCurrentCardDetails] = useState<ICard | null>(null);
  const [storedValue, setValue] = useLocalStorage('autorName');
  const [initialState, setItialState] = useState<Array<IColumn>>([]); //колонки
  const [cards, setCards] = useState<Array<ICard>>([]); //карточки
  const [comments, setComments] = useState<Array<IComment>>([]); //комментарии

  useEffect(() => {
    // вытаскиваем список колонок из LS, если нет, берем готовые
    if (localStorage.getItem('columns')) {
      setItialState(Array.from(JSON.parse(localStorage.getItem('columns')!)));
    } else {
      localStorage.setItem('columns', JSON.stringify(damyData));
      setItialState(damyData);
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
    if (localStorage.getItem('coments')) {
      setComments(Array.from(JSON.parse(localStorage.getItem('coments')!)));
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

  const updateCardList = (updatedCard: ICard) => {
    const updatedCardList = cards.map((el) => {
      return el.id === updatedCard.id ? updatedCard : el;
    });

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
    setCards(updatedCardList);
  };

  // const addComment = (newComment) => {};

  return (
    <BoardStyled>
      <Container>
        <ColumnsList>
          {initialState.map((column) => {
            return (
              <Column
                key={column.id}
                columns={initialState}
                columnInfo={column}
                setItialState={setItialState}
                cards={cards}
                setCards={setCards}
                setCurrentCardDetails={setCurrentCardDetails}
                setModalActive={setModalActive}
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
          currentCardDetails={currentCardDetails}
          updateCardList={updateCardList}
          comments={comments}
        />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
