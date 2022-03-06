import React from 'react';
import { GrClose } from 'react-icons/gr';
import { BtnClose, ModalContent, ModalPopup, ModalWrapper } from './style';

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
    <ModalPopup onClick={handleCloseModal}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <BtnClose onClick={handleCloseModal}>
          <GrClose />
        </BtnClose>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </ModalPopup>
  );
};

export default Modal;
