import React, { Dispatch, SetStateAction, useState } from 'react';
import { ICard } from '../../models';
import { Input } from '../../UIcomponents/Input';
import { Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  currentCardDetails: ICard | null;
  updateCardList: (updatedCard: ICard) => void;
};

const CardDetails: React.FC<CardDetailsPropsType> = ({
  currentCardDetails,
  updateCardList,
}: CardDetailsPropsType) => {
  console.log(currentCardDetails);
  const [cardTitle, setCardTitle] = useState(currentCardDetails?.title || '-');
  const [cardDesc, setCardDesc] = useState(currentCardDetails?.desc || '');

  const handleCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const handleCardDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDesc(e.target.value);
  };

  const changeCardTitle = () => {
    if (currentCardDetails !== null) {
      const updatetCard = { ...currentCardDetails };
      updatetCard.title = cardTitle;

      updateCardList(updatetCard);
    }
  };

  const changeCardDesc = () => {
    if (currentCardDetails !== null) {
      const updatetCard = { ...currentCardDetails };
      updatetCard.desc = cardDesc;

      updateCardList(updatetCard);
    }
  };

  return (
    <Container>
      <Row>
        <SubTitle>колонка: {currentCardDetails?.columnsTitle}</SubTitle>
      </Row>
      <Row>
        <SubTitle>Название карточки</SubTitle>
        <Input value={cardTitle} onChange={(e) => handleCardTitle(e)} onBlur={changeCardTitle} />
      </Row>
      <Row>
        <SubTitle>описание карточки</SubTitle>
        <Input value={cardDesc} onChange={(e) => handleCardDesc(e)} onBlur={changeCardDesc} />
      </Row>
      <Row>
        <SubTitle>комментарии</SubTitle>
      </Row>
    </Container>
  );
};

export default CardDetails;
