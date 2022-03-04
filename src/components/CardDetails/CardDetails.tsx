import React, { useState } from 'react';
import { ICard, IColumn, IComment } from '../../models';
import { ButtonOutlined } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';
import Comment from './components/Comment';
import { BtnWrap, Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  currentCard: ICard | null;
  columns: Array<IColumn>;
  comments: Array<IComment>;
  updateCardList: (updatedCard: ICard) => void;
  addCommentToComments: (commet: IComment) => void;
  updateComments: (updatedComment: IComment) => void;
  deleteCommentFromComments: (commentId: number) => void;
};

const CardDetails: React.FC<CardDetailsPropsType> = ({
  currentCard,
  columns,
  comments,
  updateCardList,
  addCommentToComments,
  updateComments,
  deleteCommentFromComments,
}) => {
  const columnTitle = columns.filter((el) => el.id === currentCard?.columnId)[0].title;
  const [cardTitle, setCardTitle] = useState(currentCard?.title || '-');
  const [cardDesc, setCardDesc] = useState(currentCard?.desc || '');
  const [newCommentText, setNewCommentText] = useState('');

  const handleCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const handleCardDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDesc(e.target.value);
  };

  const handleNewCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(e.target.value);
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

  const addComment = () => {
    const newComment = {
      id: Date.now(),
      cardId: currentCard?.id || 0,
      text: newCommentText,
    };

    addCommentToComments(newComment);
    setNewCommentText('');
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
      <Row>
        <SubTitle>комментарии</SubTitle>
        <Input
          value={newCommentText}
          onChange={(e) => handleNewCommentText(e)}
          placeholder="напишите комментарий"
        />
        <BtnWrap>
          <ButtonOutlined text="сохранить" onClick={addComment} />
        </BtnWrap>
      </Row>
      <Row>
        {comments.map((el) => {
          return (
            <Comment
              key={el.id}
              commentData={el}
              updateComments={updateComments}
              deleteCommentFromComments={deleteCommentFromComments}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default CardDetails;
