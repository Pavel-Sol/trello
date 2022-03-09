import React, { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { ICard, IColumn } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

import { Row, Container, CardItem, DeleteBtn } from './style';

type ColumnPropsType = {
  columnData: IColumn;
  cards: ICard[];
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
    if (!columnTitle) {
      setColumnTitle(columnData.title);
      return;
    }
    const updatedColumn = { ...columnData, title: columnTitle };
    updateColumns(updatedColumn);
  };

  const addNewCard = () => {
    if (!cardTitle) return;
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
        {cards?.length
          ? cards
              .filter((el) => el.columnId === columnData.id)
              .map((elem) => (
                <CardItem key={elem.id} onClick={() => selectCurrentCard(elem)}>
                  <DeleteBtn
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      deleteCardFromCardList(event, elem.id)
                    }>
                    <BsTrashFill />
                  </DeleteBtn>
                  <span>{elem.title}</span>
                </CardItem>
              ))
          : null}
      </Row>
    </Container>
  );
};

export default Column;
