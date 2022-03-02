import React from 'react';
import { InputStyled } from './style';

type InputPropsType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  fullWidth?: boolean;
};

const Input: React.FC<InputPropsType> = ({
  placeholder,
  value,
  onChange,
  onBlur,
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
        fullWidth={fullWidth}
      />
    </>
  );
};

export default Input;
