import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { ICard, IColumn, IComment } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

import { Row, Container, CardItem, DeleteBtn, CommentCount } from './style';
import { updateColumnList } from '../../store/ducks/column';
import { addCardToCardList, deleteCardFromCardList, selectCards } from '../../store/ducks/card';
import { selectComments } from '../../store/ducks/comment';

type ColumnPropsType = {
  columnData: IColumn;
  selectCurrentCard: (card: ICard) => void;
};

const Column: React.FC<ColumnPropsType> = ({ columnData, selectCurrentCard }) => {
  const dispatch = useDispatch();
  const [columnTitle, setColumnTitle] = useState(columnData.title);
  const [cardTitle, setCardTitle] = useState('');

  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);

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
    dispatch(updateColumnList({ column: updatedColumn }));
  };

  const addNewCard = () => {
    if (!cardTitle) return;
    const newCard = {
      id: Date.now(),
      columnId: columnData.id,
      title: cardTitle,
    };

    dispatch(addCardToCardList({ card: newCard }));
    setCardTitle('');
  };

  const deleteCard = (event: React.MouseEvent<HTMLElement>, cardId: number) => {
    dispatch(deleteCardFromCardList({ cardId: cardId }));
    event.stopPropagation();
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
