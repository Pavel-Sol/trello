import React from 'react';
import { ButtonStyled } from './style';

type ButtonPropsType = {
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
  m?: string;
};

const Button: React.FC<ButtonPropsType> = ({ onClick, text, fullWidth, m }: ButtonPropsType) => {
  return (
    <ButtonStyled onClick={onClick} fullWidth={fullWidth} m={m}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
