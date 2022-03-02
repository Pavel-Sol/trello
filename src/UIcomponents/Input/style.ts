import styled from 'styled-components';

export const InputStyled = styled('input')<{ fullWidth?: boolean }>`
  ${(props) => (props.fullWidth ? `width: 100%` : `width: 250px`)};
  height: 40px;
  padding: 0px 8px;
  border: none;
  box-shadow: 0 1px 0 #091e4240;
  border-radius: 3px;
`;
