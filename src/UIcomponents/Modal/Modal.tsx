import React, { useEffect } from 'react';
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
  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);

    return function cleanup() {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [closeByEsc]);

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
