import styled from 'styled-components';

export const BoardStyled = styled.div`
  background: ${(props) => props.theme.bg_blue};
`;

export const Container = styled.div`
  max-width: 1500px;
  margin: 0px auto;
  padding: 40px 25px;
  height: 100vh;
`;

export const ColumnsList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
