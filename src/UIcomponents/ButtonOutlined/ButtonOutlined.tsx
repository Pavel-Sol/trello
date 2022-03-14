import React from 'react';
import { ButtonOutlinedStyled } from './style';

type ButtonOutlinedPropsType = {
  disabled?: boolean;
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
  m?: string;
};

const ButtonOutlined: React.FC<ButtonOutlinedPropsType> = ({
  disabled,
  onClick,
  text,
  fullWidth,
  m,
}: ButtonOutlinedPropsType) => {
  return (
    <ButtonOutlinedStyled onClick={onClick} fullWidth={fullWidth} m={m} disabled={disabled}>
      {text}
    </ButtonOutlinedStyled>
  );
};

export default ButtonOutlined;
