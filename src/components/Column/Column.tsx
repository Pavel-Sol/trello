import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICard, IColumn } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

import { Row, Container, CardItem, DeleteBtn } from './style';

type ColumnPropsType = {
  columnData: IColumn;
  cards: Array<ICard>;
  updateColumns: (updatedColumn: IColumn) => void;
  addCardInCardList: (card: ICard) => void;
  deleteCardFromCardList: (event: React.MouseEvent<HTMLElement>, cardId: number) => void;
  selectCurrentCard: (card: ICard) => void;
};

const Column: React.FC<ColumnPropsType> = ({
  columnData,
  cards,
  updateColumns,
  addCardInCardList,
  deleteCardFromCardList,
  selectCurrentCard,
}) => {
  const [columnTitle, setColumnTitle] = useState(columnData.title);
  const [cardTitle, setCardTitle] = useState('');

  const handleColumnsTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };

  const handleCardsTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const saveColumnsTitle = () => {
    const updatedColumn = { ...columnData, title: columnTitle };
    updateColumns(updatedColumn);
  };

  const addNewCard = () => {
    const newCard = {
      id: Date.now(),
      columnId: columnData.id,
      title: cardTitle,
    };

    addCardInCardList(newCard);
    setCardTitle('');
  };

  return (
    <Container>
      <Row>
        <Input value={columnTitle} onChange={handleColumnsTitle} onBlur={saveColumnsTitle} />
      </Row>
      <Row>
        <Input value={cardTitle} onChange={handleCardsTitle} />
        <Button text="Добавить карточку" fullWidth={true} onClick={addNewCard} />
      </Row>
      <Row>
        {cards?.length &&
          cards
            .filter((el) => el.columnId === columnData.id)
            .map((elem) => (
              <CardItem key={elem.id} onClick={() => selectCurrentCard(elem)}>
                <DeleteBtn
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    deleteCardFromCardList(event, elem.id)
                  }>
                  x
                </DeleteBtn>
                <span>{elem.title}</span>
              </CardItem>
            ))}
      </Row>
    </Container>
  );
};

export default Column;
