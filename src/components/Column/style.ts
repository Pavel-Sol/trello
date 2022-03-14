import styled from 'styled-components';
import { Button } from '../../UIcomponents/Button';

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
  flex-direction: column;
  margin: 5px 0px;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
`;

export const DeleteBtn = styled(Button)`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentCount = styled.p`
  font-size: 12px;
  margin-top: 10px;
`;

export const ButtonStyled = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;
