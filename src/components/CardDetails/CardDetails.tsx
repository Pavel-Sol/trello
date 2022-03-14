import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { selectAuthor } from '../../store/ducks/author';
import { updateCardList } from '../../store/ducks/card';
import { addComment, selectComments } from '../../store/ducks/comment';
import { Input } from '../../UIcomponents/Input';
import { Comment } from './components/Comment';
import { ButtonStyled, Container, Row, SubTitle } from './style';
import { CardDescValuesType, CardDetailsPropsType, CardTitleValuesType } from './types';

const CardDetails: React.FC<CardDetailsPropsType> = ({ columns, currentCard }) => {
  const dispatch = useDispatch();
  const authorName = useSelector(selectAuthor);
  const comments = useSelector(selectComments);
  const columnTitle = columns.filter((el) => el.id === currentCard?.columnId)[0].title;
  const commentsByCurrentCard = comments.filter((el) => el.cardId === currentCard?.id);

  const handleSubmitCardTitle = (values: CardTitleValuesType) => {
    if (currentCard !== null && values.cardTitle) {
      const updatedCard = { ...currentCard };
      updatedCard.title = values.cardTitle;
      dispatch(updateCardList({ card: updatedCard }));
    }
  };

  const handleSubmitCardDesc = (values: CardDescValuesType) => {
    if (currentCard !== null && values.cardDesc) {
      const updatedCard = { ...currentCard };
      updatedCard.desc = values.cardDesc;

      dispatch(updateCardList({ card: updatedCard }));
    }
  };

  type NewCommentTextValuesType = {
    newCommentText: string;
  };

  const handleSubmitComment = (values: NewCommentTextValuesType) => {
    const newComment = {
      id: Date.now(),
      cardId: currentCard?.id || 0,
      text: values.newCommentText,
    };

    dispatch(addComment({ comment: newComment }));
    values.newCommentText = '';
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
        <Form
          onSubmit={handleSubmitCardTitle}
          initialValues={{ cardTitle: currentCard?.title }}
          render={({ handleSubmit }) => (
            <Field name="cardTitle" component={Input} onBlur={handleSubmit} />
          )}
        />
      </Row>
      <Row>
        <SubTitle>описание карточки</SubTitle>
        <Form
          onSubmit={handleSubmitCardDesc}
          initialValues={{ cardDesc: currentCard?.desc }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="cardDesc" component={Input} onBlur={handleSubmit} />
            </form>
          )}
        />
      </Row>
      <Row>
        <SubTitle>{`комментарии (${commentsByCurrentCard.length})`}</SubTitle>
        <Form
          onSubmit={handleSubmitComment}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newCommentText" component={Input} placeholder="добавьте комментарий" />
              <ButtonStyled onClick={handleSubmit} disabled={!values.newCommentText}>
                добавить
              </ButtonStyled>
            </form>
          )}
        />
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
