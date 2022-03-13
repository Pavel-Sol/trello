import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { Form, Field } from 'react-final-form';

import { ICard, IColumn } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';
import { Row, Container, CardItem, DeleteBtn, CommentCount } from './style';
import { updateColumnList } from '../../store/ducks/column';
import { addCardToCardList, deleteCardFromCardList, selectCards } from '../../store/ducks/card';
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

  const deleteCard = (event: React.MouseEvent<HTMLElement>, cardId: number) => {
    dispatch(deleteCardFromCardList({ cardId: cardId }));
    event.stopPropagation();
  };

  const saveColumnsTitle = (values: ColumnTitleValuesType) => {
    if (values.columnTitle) {
      const updatedColumn = { ...columnData, title: values.columnTitle };
      dispatch(updateColumnList({ column: updatedColumn }));
    } else {
      values.columnTitle = columnData.title;
    }
  };

  const addNewCard = (values: CardTitleValuesType) => {
    if (values.cardTitle) {
      const newCard = {
        id: Date.now(),
        columnId: columnData.id,
        title: values.cardTitle,
      };

      dispatch(addCardToCardList({ card: newCard }));
      values.cardTitle = '';
    }
  };

  return (
    <Container>
      <Row>
        <Form
          onSubmit={saveColumnsTitle}
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
          onSubmit={addNewCard}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="cardTitle" component={Input} />
              <Button text="Добавить карточку" fullWidth={true} onClick={handleSubmit} />
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
                    onClick={(event: React.MouseEvent<HTMLElement>) => deleteCard(event, elem.id)}>
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
