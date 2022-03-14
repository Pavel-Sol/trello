import styled from 'styled-components';
import { Button } from '../../UIcomponents/Button';

export const Container = styled.div`
  min-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;
export const BtnGroup = styled.div`
  width: 250px;
  margin: 7px 0px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;
export const ButtonStyled = styled(Button)`
  margin-left: 10px;
`;
export const SmallText = styled.p`
  margin-bottom: 2px;
  font-size: 12px;
  color: #5e6c84;
`;
