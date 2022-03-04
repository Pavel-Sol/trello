import styled from 'styled-components';

export const ButtonOutlinedStyled = styled('button')<{
  fullWidth?: boolean;
  m?: string;
}>`
  ${(props) => (props.fullWidth ? `width: 100%` : `auto`)};
  ${(props) => (props.m ? `margin: ${props.m}` : `margin : 0`)};
  height: 32px;
  border-radius: 3px;
  border: none;
  transition: all 0.3s ease;
  padding: 0 5px;
  background-color: rgb(0, 121, 191);
  color: #fff;
  &:hover {
    background-color: rgb(72, 178, 240);
  }
`;

export const ButtonStyled = styled('button')<{
  fullWidth?: boolean;
  m?: string;
}>`
  ${(props) => (props.fullWidth ? `width: 100%` : `auto`)};
  ${(props) => (props.m ? `margin: ${props.m}` : `margin : 0`)};
  height: 32px;
  border-radius: 3px;
  border: none;
  transition: all 0.3s ease;
  padding: 0 5px;
  color: #5e6c84;
  margin: 5px 0px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
