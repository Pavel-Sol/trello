import React from 'react';
import { BtnClose, ModalPopup, ModalWrapper } from './style';

type ModalPropsType = {
  visible: boolean;
  children: React.ReactNode;
  handleCloseModal: () => void;
};

const Modal: React.FC<ModalPropsType> = ({
  children,
  visible,
  handleCloseModal,
}: ModalPropsType) => {
  if (!visible) {
    return null;
  }

  return (
    <ModalPopup>
      <ModalWrapper>
        <BtnClose onClick={handleCloseModal}>закрыть</BtnClose>
        {children}
      </ModalWrapper>
    </ModalPopup>
  );
};

export default Modal;
