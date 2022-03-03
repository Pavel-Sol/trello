import styled from 'styled-components';

export const Container = styled.div`
  width: 272px;
  padding: 7px;
  border-radius: 3px;
  background-color: #ebecf0;
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const CardItem = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
  border-radius: 2px;
  position: relative;
`;

export const DeleteBtn = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(238, 243, 247);
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(200, 208, 214);
  }
`;
