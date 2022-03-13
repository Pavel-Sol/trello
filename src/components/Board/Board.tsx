import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICard, IColumn } from '../../models';
import { selectAuthor } from '../../store/ducks/author';
import { selectColumns } from '../../store/ducks/column';
import { Modal } from '../../UIcomponents/Modal';
import { CardDetails } from '../CardDetails';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const authorName: string = useSelector(selectAuthor);
  const columns: Array<IColumn> = useSelector(selectColumns);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  useEffect(() => {
    // проверяем, есть ли имя автора
    if (!authorName) {
      setModalActive('USER_SETTING');
    }
  }, [authorName]);

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  const selectCurrentCard = (card: ICard) => {
    setCurrentCard(card);
    setModalActive('CARD_DETAILS');
  };

  return (
    <BoardStyled>
      <Container>
        <ColumnsList>
          {columns.map((column) => {
            return (
              <Column key={column.id} columnData={column} selectCurrentCard={selectCurrentCard} />
            );
          })}
        </ColumnsList>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal visible={modalActive === 'CARD_DETAILS'} handleCloseModal={handleCloseModal}>
        <CardDetails columns={columns} currentCard={currentCard} />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
