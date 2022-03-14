import styled from 'styled-components';
import { Button } from '../Button';

export const ModalPopup = styled.div`
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 149, 237, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  background-color: #ebecf0;
  min-width: 100px;
  max-width: 500px;
  position: relative;
  border-radius: 5px;
`;
export const ModalContent = styled.div`
  padding: 40px 40px;
  max-height: 600px;
  min-width: 100px;
  max-width: 500px;
  overflow-y: auto;
`;

export const BtnClose = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
