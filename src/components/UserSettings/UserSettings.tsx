import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { setAuthorName } from '../../store/ducks/author';
import { Input } from '../../UIcomponents/Input';
import { AuthorNameValuesType, UserSettingsPropsType } from './types';
import { ButtonStyled } from './style';

const UserSettings: React.FC<UserSettingsPropsType> = ({ handleCloseModal }) => {
  const dispatch = useDispatch();

  const handleSubmitAuthor = (values: AuthorNameValuesType) => {
    if (values.authorName) {
      dispatch(setAuthorName({ authorName: values.authorName }));
      handleCloseModal();
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmitAuthor}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="authorName" component={Input} placeholder="введите имя" />
            <ButtonStyled>сохранить</ButtonStyled>
          </form>
        )}
      />
    </>
  );
};

export default UserSettings;
