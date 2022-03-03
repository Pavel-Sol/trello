import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICard, IColumn } from '../../models';
import { Button } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';
import { updateColumnsByCardsId, updateColumnsByTitle } from '../../utils/utils';
import { Row, Container } from './style';

type ColumnPropsType = {
  columnInfo: IColumn;
  setItialState: Dispatch<SetStateAction<IColumn[]>>;
  cards: Array<ICard>;
  setCards: Dispatch<SetStateAction<ICard[]>>;
  columns: Array<IColumn>;
};

const Column: React.FC<ColumnPropsType> = ({
  columnInfo,
  setItialState,
  cards,
  setCards,
  columns,
}) => {
  const [columnsTitle, setColumnsTitle] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleColumnsTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnsTitle(e.target.value);
  };

  const handleNewCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardTitle(e.target.value);
  };

  useEffect(() => {
    setColumnsTitle(columnInfo.title);
  }, [columnInfo.title]);

  const changeСolumnsTitle = () => {
    // изменение названия колонки
    const updatedColumn = updateColumnsByTitle(columnInfo, columns, columnsTitle);
    localStorage.setItem('columns', JSON.stringify(updatedColumn));
    setItialState(updatedColumn);
  };

  const addNewCard = () => {
    // добавление новой карточки
    const newCard = { id: Date.now(), title: newCardTitle, commentIds: [] };

    const updatedColumn = updateColumnsByCardsId(columnInfo, columns, newCard.id);

    localStorage.setItem('columns', JSON.stringify(updatedColumn));
    setItialState(updatedColumn);

    localStorage.setItem('cards', JSON.stringify([...cards, newCard]));
    setCards([newCard, ...cards]);
    setNewCardTitle('');
  };

  console.log(cards);

  return (
    <Container>
      <Row>
        <Input value={columnsTitle} onChange={handleColumnsTitle} onBlur={changeСolumnsTitle} />
      </Row>
      <Row>
        <Input value={newCardTitle} onChange={handleNewCardTitle} />
        <Button text="Добавить карточку" fullWidth={true} onClick={addNewCard} />
      </Row>
      <Row>
        {cards?.length &&
          cards
            .filter((e) => columnInfo.cardIds.includes(e.id))
            .map((e) => <div key={e.id}>{e.title}</div>)}
      </Row>
    </Container>
  );
};

export default Column;
