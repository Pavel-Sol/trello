import React from 'react';
import { ButtonOutlinedStyled } from './style';

type ButtonOutlinedPropsType = {
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
  m?: string;
};

const ButtonOutlined: React.FC<ButtonOutlinedPropsType> = ({
  onClick,
  text,
  fullWidth,
  m,
}: ButtonOutlinedPropsType) => {
  return (
    <ButtonOutlinedStyled onClick={onClick} fullWidth={fullWidth} m={m}>
      {text}
    </ButtonOutlinedStyled>
  );
};

export default ButtonOutlined;
