import React from 'react';
import { InputStyled } from './style';
import { FieldRenderProps } from 'react-final-form';

type InputPropsType = FieldRenderProps<string, any>;

const Input: React.FC<InputPropsType> = ({ input, meta, ...rest }: InputPropsType) => {
  return (
    <>
      <InputStyled {...input} {...rest} />
    </>
  );
};

export default Input;
