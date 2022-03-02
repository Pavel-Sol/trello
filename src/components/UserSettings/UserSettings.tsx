import React, { useState } from 'react';
import { ButtonOutlined } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

type UserSettingsPropsType = {
  setValue: (userName: string) => void;
  handleCloseModal: () => void;
};

const UserSettings: React.FC<UserSettingsPropsType> = ({ setValue, handleCloseModal }) => {
  const [userName, setUserName] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const saveAutorName = () => {
    setValue(userName);
    if (userName) handleCloseModal();
  };

  return (
    <>
      <Input placeholder="введите имя" value={userName} onChange={handleInput} fullWidth={true} />
      <ButtonOutlined onClick={saveAutorName} text="сохранить" m="10px" />
    </>
  );
};

export default UserSettings;
