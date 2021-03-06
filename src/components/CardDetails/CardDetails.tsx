import React, { useState } from 'react';
import { ICard, IColumn, IComment } from '../../models';
import { ButtonOutlined } from '../../UIcomponents/ButtonOutlined';
import { Input } from '../../UIcomponents/Input';
import { Comment } from './components/Comment';
import { BtnWrap, Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  author: string;
  currentCard: ICard | null;
  columns: IColumn[];
  comments: IComment[];
  updateCardList: (updatedCard: ICard) => void;
  addCommentToComments: (comment: IComment) => void;
  updateComments: (updatedComment: IComment) => void;
  deleteCommentFromComments: (commentId: number) => void;
};

const CardDetails: React.FC<CardDetailsPropsType> = ({
  author,
  currentCard,
  columns,
  comments,
  updateCardList,
  addCommentToComments,
  updateComments,
  deleteCommentFromComments,
}) => {
  const columnTitle = columns.filter((el) => el.id === currentCard?.columnId)[0].title;
  const commentsByCurrentCard = comments.filter((el) => el.cardId === currentCard?.id);
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
    if (!cardTitle) {
      setCardTitle(currentCard?.title || '');
      return;
    }

    if (currentCard !== null) {
      const updatedCard = { ...currentCard };
      updatedCard.title = cardTitle;

      updateCardList(updatedCard);
    }
  };

  const saveCardDesc = () => {
    if (currentCard !== null) {
      const updatedCard = { ...currentCard };
      updatedCard.desc = cardDesc;

      updateCardList(updatedCard);
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
        <SubTitle>??????????????: {columnTitle}</SubTitle>
      </Row>
      <Row>
        <SubTitle>??????????: {author}</SubTitle>
      </Row>
      <Row>
        <SubTitle>???????????????? ????????????????</SubTitle>
        <Input value={cardTitle} onChange={(e) => handleCardTitle(e)} onBlur={saveCardTitle} />
      </Row>
      <Row>
        <SubTitle>???????????????? ????????????????</SubTitle>
        <Input value={cardDesc} onChange={(e) => handleCardDesc(e)} onBlur={saveCardDesc} />
      </Row>
      <Row>
        <SubTitle>{`?????????????????????? (${commentsByCurrentCard.length})`}</SubTitle>
        <Input
          value={newCommentText}
          onChange={(e) => handleNewCommentText(e)}
          placeholder="???????????????? ??????????????????????"
        />
        <BtnWrap>
          <ButtonOutlined text="????????????????" onClick={addComment} />
        </BtnWrap>
      </Row>
      <Row>
        {commentsByCurrentCard.map((el) => {
          return (
            <Comment
              author={author}
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
