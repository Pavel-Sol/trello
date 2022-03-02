import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { IColumn } from '../../models';
import { Modal } from '../../UIcomponents/Modal';
import { Column } from '../Column';
import { UserSettings } from '../UserSettings';
import { BoardStyled, ColumnsList, Container } from './style';

const damyData = [
  { id: 0, title: 'TODO', cardIds: [] },
  { id: 1, title: 'In Progress', cardIds: [] },
  { id: 2, title: 'Testing', cardIds: [] },
  { id: 3, title: 'Done', cardIds: [] },
];

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const [storedValue, setValue] = useLocalStorage('autorName');
  const [initialState, setItialState] = useState<Array<IColumn>>([]);

  useEffect(() => {
    if (localStorage.getItem('columns')) {
      setItialState(Array.from(JSON.parse(localStorage.getItem('columns')!)));
    } else {
      localStorage.setItem('columns', JSON.stringify(damyData));
      setItialState(damyData);
    }
  }, []);

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  useEffect(() => {
    if (!storedValue) {
      setModalActive('USER_SETTING');
    }
  }, [storedValue]);

  return (
    <BoardStyled>
      <Container>
        <ColumnsList>
          {initialState.map((column) => {
            return <Column key={column.id} columnInfo={column} setItialState={setItialState} />;
          })}
        </ColumnsList>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings setValue={setValue} handleCloseModal={handleCloseModal} />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
