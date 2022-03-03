import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICard, IColumn } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';
import {
  deleteCardsIdFromColumn,
  updateColumnsByCardsId,
  updateColumnsByTitle,
} from '../../utils/utils';
import { Row, Container, CardItem, DeleteBtn } from './style';

type ColumnPropsType = {
  columnInfo: IColumn;
  setItialState: Dispatch<SetStateAction<IColumn[]>>;
  cards: Array<ICard>;
  setCards: Dispatch<SetStateAction<ICard[]>>;
  columns: Array<IColumn>;
  setCurrentCardDetails: Dispatch<SetStateAction<ICard | null>>;
  setModalActive: Dispatch<SetStateAction<string>>;
};

const Column: React.FC<ColumnPropsType> = ({
  columnInfo,
  setItialState,
  cards,
  setCards,
  columns,
  setCurrentCardDetails,
  setModalActive,
}) => {
  const [columnsTitle, setColumnsTitle] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleColumnsTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnsTitle(e.target.value);
  };

  const handleNewCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardTitle(e.target.value);
  };

  const handleClickOnCardItem = (e: ICard) => {
    setCurrentCardDetails(e);
    setModalActive('CARD_DETAILS');
  };

  useEffect(() => {
    setColumnsTitle(columnInfo.title);
  }, [columnInfo.title]);

  const changeСolumnsTitle = () => {
    // изменение названия колонки
    const updatedColumn = updateColumnsByTitle(columnInfo, columns, columnsTitle);
    localStorage.setItem('columns', JSON.stringify(updatedColumn));
    setItialState(updatedColumn);
  };

  const addNewCard = () => {
    // добавление новой карточки
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      commentIds: [],
      columnsTitle: columnInfo.title,
    };

    const updatedColumn = updateColumnsByCardsId(columnInfo, columns, newCard.id);

    localStorage.setItem('columns', JSON.stringify(updatedColumn));
    setItialState(updatedColumn);

    localStorage.setItem('cards', JSON.stringify([...cards, newCard]));
    setCards([newCard, ...cards]);
    setNewCardTitle('');
  };

  const deleteCard = (cardId: number) => {
    // удаление новой карточки
    const updatedColumn = deleteCardsIdFromColumn(columnInfo, columns, cardId);

    localStorage.setItem('columns', JSON.stringify(updatedColumn));
    setItialState(updatedColumn);

    const updatedCardList = [...cards].filter((el) => el.id !== cardId);

    localStorage.setItem('cards', JSON.stringify(updatedCardList));
    setCards(updatedCardList);
  };

  return (
    <Container>
      <Row>
        <Input value={columnsTitle} onChange={handleColumnsTitle} onBlur={changeСolumnsTitle} />
      </Row>
      <Row>
        <Input value={newCardTitle} onChange={handleNewCardTitle} />
        <Button text="Добавить карточку" fullWidth={true} onClick={addNewCard} />
      </Row>
      <Row>
        {cards?.length &&
          cards
            .filter((e) => columnInfo.cardIds.includes(e.id))
            .map((e) => (
              <CardItem key={e.id} onClick={() => handleClickOnCardItem(e)}>
                <DeleteBtn onClick={() => deleteCard(e.id)}>x</DeleteBtn>
                <span>{e.title}</span>
              </CardItem>
            ))}
      </Row>
    </Container>
  );
};

export default Column;
