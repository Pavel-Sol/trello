import React from 'react';
import { ButtonStyled } from './style';

type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  className?: string;
  mode?: 'primary' | 'secondary' | undefined;
};

const Button: React.FC<ButtonPropsType> = ({
  onClick,
  children,
  mode,
  disabled,
  className,
}: ButtonPropsType) => {
  return (
    <ButtonStyled onClick={onClick} mode={mode} disabled={disabled} className={className}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
