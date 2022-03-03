import styled from 'styled-components';

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
  padding: 30px 30px;
  background-color: #ebecf0;
  min-width: 100px;
  max-width: 500px;
  position: relative;
  border-radius: 5px;
`;

export const BtnClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
