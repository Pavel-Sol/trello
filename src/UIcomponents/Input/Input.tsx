import React from 'react';
import { InputStyled } from './style';

type InputPropsType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  fullWidth?: boolean;
};

const Input: React.FC<InputPropsType> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  fullWidth,
}: InputPropsType) => {
  return (
    <>
      <InputStyled
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        fullWidth={fullWidth}
      />
    </>
  );
};

export default Input;
