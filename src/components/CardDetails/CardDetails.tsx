import React, { useState } from 'react';
import { ICard, IColumn } from '../../models';
import { Input } from '../../UIcomponents/Input';
import { Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  currentCard: ICard | null;
  columns: Array<IColumn>;
  updateCardList: (updatedCard: ICard) => void;
};

const CardDetails: React.FC<CardDetailsPropsType> = ({ currentCard, columns, updateCardList }) => {
  const columnTitle = columns.filter((el) => el.id === currentCard?.columnId)[0].title;
  const [cardTitle, setCardTitle] = useState(currentCard?.title || '-');
  const [cardDesc, setCardDesc] = useState(currentCard?.desc || '');

  const handleCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const handleCardDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDesc(e.target.value);
  };

  const saveCardTitle = () => {
    if (currentCard !== null) {
      const updatetCard = { ...currentCard };
      updatetCard.title = cardTitle;

      updateCardList(updatetCard);
    }
  };

  const saveCardDesc = () => {
    if (currentCard !== null) {
      const updatetCard = { ...currentCard };
      updatetCard.desc = cardDesc;

      updateCardList(updatetCard);
    }
  };

  return (
    <Container>
      <Row>
        <SubTitle>колонка: {columnTitle}</SubTitle>
      </Row>
      <Row>
        <SubTitle>Название карточки</SubTitle>
        <Input value={cardTitle} onChange={(e) => handleCardTitle(e)} onBlur={saveCardTitle} />
      </Row>
      <Row>
        <SubTitle>описание карточки</SubTitle>
        <Input value={cardDesc} onChange={(e) => handleCardDesc(e)} onBlur={saveCardDesc} />
      </Row>
    </Container>
  );
};

export default CardDetails;
