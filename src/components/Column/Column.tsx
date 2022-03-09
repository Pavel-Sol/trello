import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { ICard, IColumn, IComment } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

import { Row, Container, CardItem, DeleteBtn, CommentCount } from './style';
import { updateColumnList } from '../../store/ducks/column';

type ColumnPropsType = {
  comments: IComment[];
  columnData: IColumn;
  cards: ICard[];
  addCardInCardList: (card: ICard) => void;
  deleteCardFromCardList: (event: React.MouseEvent<HTMLElement>, cardId: number) => void;
  selectCurrentCard: (card: ICard) => void;
};

const Column: React.FC<ColumnPropsType> = ({
  columnData,
  cards,
  comments,
  addCardInCardList,
  deleteCardFromCardList,
  selectCurrentCard,
}) => {
  const dispatch = useDispatch();
  const [columnTitle, setColumnTitle] = useState(columnData.title);
  const [cardTitle, setCardTitle] = useState('');

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

    addCardInCardList(newCard);
    setCardTitle('');
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
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      deleteCardFromCardList(event, elem.id)
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
