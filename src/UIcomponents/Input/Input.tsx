import React from 'react';
import { InputStyled } from './style';

type InputPropsType = {
  placeholder: string;
  value: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputPropsType> = ({
  placeholder,
  value,
  onChange,
  fullWidth,
}: InputPropsType) => {
  return (
    <>
      <InputStyled
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
      />
    </>
  );
};

export default Input;
