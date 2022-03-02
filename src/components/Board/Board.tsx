import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Modal } from '../../UIcomponents/Modal';
import { UserSettings } from '../UserSettings';
import { BoardStyled, Container } from './style';

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');
  const [storedValue, setValue] = useLocalStorage('autorName');

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  useEffect(() => {
    console.log(storedValue);

    if (!storedValue) {
      setModalActive('USER_SETTING');
    }
    // const autorName = localStorage.getItem('autorName');
    // console.log(autorName);
    // if (!autorName) {
    //   setModalActive('USER_SETTING');
    // }
  }, [storedValue]);

  return (
    <BoardStyled>
      <Container>
        <div>dsgdfgddfdfb</div>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings setValue={setValue} handleCloseModal={handleCloseModal} />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
