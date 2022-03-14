import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { Form, Field } from 'react-final-form';

import { ICard, IColumn } from '../../models';
import { Input } from '../../UIcomponents/Input';
import { Row, Container, CardItem, DeleteBtn, CommentCount, ButtonStyled } from './style';
import { updateColumnList } from '../../store/ducks/column';
import { addCard, deleteCard, selectCards } from '../../store/ducks/card';
import { selectComments } from '../../store/ducks/comment';
import { CardTitleValuesType, ColumnTitleValuesType } from './types';

type ColumnPropsType = {
  columnData: IColumn;
  selectCurrentCard: (card: ICard) => void;
};

const Column: React.FC<ColumnPropsType> = ({ columnData, selectCurrentCard }) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);

  const handleDeleteCard = (event: React.MouseEvent<HTMLElement>, cardId: number) => {
    dispatch(deleteCard({ cardId: cardId }));
    event.stopPropagation();
  };

  const handleSubmitColumn = (values: ColumnTitleValuesType) => {
    if (values.columnTitle) {
      const updatedColumn = { ...columnData, title: values.columnTitle };
      dispatch(updateColumnList({ column: updatedColumn }));
    } else {
      values.columnTitle = columnData.title;
    }
  };

  const handleSubmitCard = (values: CardTitleValuesType) => {
    if (values.cardTitle) {
      const newCard = {
        id: Date.now(),
        columnId: columnData.id,
        title: values.cardTitle,
      };

      dispatch(addCard({ card: newCard }));
      values.cardTitle = '';
    }
  };

  return (
    <Container>
      <Row>
        <Form
          onSubmit={handleSubmitColumn}
          initialValues={{ columnTitle: columnData.title }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="columnTitle" component={Input} onBlur={handleSubmit} />
            </form>
          )}
        />
      </Row>
      <Row>
        <Form
          onSubmit={handleSubmitCard}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="cardTitle" component={Input} />
              <ButtonStyled mode="secondary">Добавить карточку</ButtonStyled>
            </form>
          )}
        />
      </Row>
      <Row>
        {cards?.length
          ? cards
              .filter((el) => el.columnId === columnData.id)
              .map((elem) => (
                <CardItem key={elem.id} onClick={() => selectCurrentCard(elem)}>
                  <DeleteBtn
                    mode="secondary"
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      handleDeleteCard(event, elem.id)
                    }>
                    <BsTrashFill />
                  </DeleteBtn>

                  <span>{elem.title}</span>
                  <CommentCount>
                    {comments.filter((comment) => comment.cardId === elem.id).length}
                    &nbsp;комментариев
                  </CommentCount>
                </CardItem>
              ))
          : null}
      </Row>
    </Container>
  );
};

export default Column;
