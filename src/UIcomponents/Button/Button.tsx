import React from 'react';
import { ButtonStyled } from './style';

type ButtonPropsType = {
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({
  onClick,
  text,
  fullWidth,
}: ButtonPropsType) => {
  return (
    <ButtonStyled onClick={onClick} fullWidth={fullWidth}>
      {text}
    </ButtonStyled>
  );
};
