import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { setAuthorName } from '../../store/ducks/author';
import { ButtonOutlined } from '../../UIcomponents/ButtonOutlined';
import { Input } from '../../UIcomponents/Input';
import { AuthorNameValuesType, UserSettingsPropsType } from './types';

const UserSettings: React.FC<UserSettingsPropsType> = ({ handleCloseModal }) => {
  const dispatch = useDispatch();

  const saveAuthorName = (values: AuthorNameValuesType) => {
    if (values.authorName) {
      dispatch(setAuthorName({ authorName: values.authorName }));
      handleCloseModal();
    }
  };

  return (
    <>
      <Form
        onSubmit={saveAuthorName}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="authorName" component={Input} placeholder="введите имя" />
            <ButtonOutlined text="сохранить" onClick={handleSubmit} m="10px" />
          </form>
        )}
      />
    </>
  );
};

export default UserSettings;
