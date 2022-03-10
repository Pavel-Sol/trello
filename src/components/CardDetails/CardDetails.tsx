import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICard, IColumn } from '../../models';
import { selectAuthor } from '../../store/ducks/author';
import { updateCardList } from '../../store/ducks/card';
import { addCommentToCommentList, selectComments } from '../../store/ducks/comment';
import { ButtonOutlined } from '../../UIcomponents/ButtonOutlined';
import { Input } from '../../UIcomponents/Input';
import { Comment } from './components/Comment';
import { BtnWrap, Container, Row, SubTitle } from './style';

type CardDetailsPropsType = {
  currentCard: ICard | null;
  columns: IColumn[];
};

const CardDetails: React.FC<CardDetailsPropsType> = ({ currentCard, columns }) => {
  const dispatch = useDispatch();
  const authorName = useSelector(selectAuthor);
  const comments = useSelector(selectComments);

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

      dispatch(updateCardList({ card: updatedCard }));
    }
  };

  const saveCardDesc = () => {
    if (currentCard !== null) {
      const updatedCard = { ...currentCard };
      updatedCard.desc = cardDesc;

      dispatch(updateCardList({ card: updatedCard }));
    }
  };

  const addComment = () => {
    const newComment = {
      id: Date.now(),
      cardId: currentCard?.id || 0,
      text: newCommentText,
    };

    dispatch(addCommentToCommentList({ comment: newComment }));
    setNewCommentText('');
  };

  return (
    <Container>
      <Row>
        <SubTitle>колонка: {columnTitle}</SubTitle>
      </Row>
      <Row>
        <SubTitle>автор: {authorName}</SubTitle>
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
        <SubTitle>{`комментарии (${commentsByCurrentCard.length})`}</SubTitle>
        <Input
          value={newCommentText}
          onChange={(e) => handleNewCommentText(e)}
          placeholder="напишите комментарий"
        />
        <BtnWrap>
          <ButtonOutlined text="добавить" onClick={addComment} />
        </BtnWrap>
      </Row>
      <Row>
        {commentsByCurrentCard.map((el) => {
          return <Comment key={el.id} commentData={el} />;
        })}
      </Row>
    </Container>
  );
};

export default CardDetails;
