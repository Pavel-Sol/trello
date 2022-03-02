import React from 'react';
import { ButtonStyled } from './style';

type ButtonPropsType = {
  onClick: () => void;
  text: string;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({ onClick, text }: ButtonPropsType) => {
  return <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;
};
