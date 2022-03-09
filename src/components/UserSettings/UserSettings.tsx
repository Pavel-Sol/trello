import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthorName } from '../../store/ducks/author';
import { ButtonOutlined } from '../../UIcomponents/ButtonOutlined';
import { Input } from '../../UIcomponents/Input';

type UserSettingsPropsType = {
  handleCloseModal: () => void;
};

const UserSettings: React.FC<UserSettingsPropsType> = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const saveAuthorName = () => {
    if (userName) {
      dispatch(setAuthorName({ authorName: userName }));
      handleCloseModal();
    }
  };

  return (
    <>
      <Input placeholder="введите имя" value={userName} onChange={handleInput} fullWidth={true} />
      <ButtonOutlined onClick={saveAuthorName} text="сохранить" m="10px" />
    </>
  );
};

export default UserSettings;
