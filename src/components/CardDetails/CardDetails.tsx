import React, { Dispatch, SetStateAction, useState } from 'react';
import { ICard, IComment } from '../../models';
import { Input } from '../../UIcomponents/Input';
import { Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  currentCardDetails: ICard | null;
  updateCardList: (updatedCard: ICard) => void;
  comments: Array<IComment>;
};

const CardDetails: React.FC<CardDetailsPropsType> = ({
  currentCardDetails,
  comments,
  updateCardList,
}: CardDetailsPropsType) => {
  console.log(currentCardDetails);
  const [cardTitle, setCardTitle] = useState(currentCardDetails?.title || '-');
  const [cardDesc, setCardDesc] = useState(currentCardDetails?.desc || '');
  const [commentText, setCommentText] = useState('');
  const currentCommentsList = comments.filter((el) =>
    currentCardDetails?.commentIds?.includes(el.id),
  );

  const handleCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const handleCardDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDesc(e.target.value);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
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
        <Input value={commentText} onChange={(e) => handleCommentText(e)} />
        <div>
          {currentCommentsList.map((el) => (
            <div key={el.id}>{el.text}</div>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default CardDetails;
