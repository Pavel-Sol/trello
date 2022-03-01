import React, { useEffect, useState } from 'react';
import { Modal } from '../../UIcomponents/Modal';
import { UserSettings } from '../UserSettings';
import { BoardStyled, Container } from './style';

const Board: React.FC = () => {
  const [modalActive, setModalActive] = useState('');

  const handleCloseModal = (): void => {
    setModalActive('');
  };

  useEffect(() => {
    setModalActive('USER_SETTING');
  }, []);

  return (
    <BoardStyled>
      <Container>
        <div>dsgdfgddfdfb</div>
      </Container>
      <Modal visible={modalActive === 'USER_SETTING'} handleCloseModal={handleCloseModal}>
        <UserSettings />
      </Modal>
    </BoardStyled>
  );
};

export default Board;
