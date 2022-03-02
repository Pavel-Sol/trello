import React, { useState } from 'react';
import { ButtonOutlined } from '../../UIcomponents/Button';
import { Input } from '../../UIcomponents/Input';

const UserSettings = () => {
  const [userName, setUserName] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const saveSettings = () => {
    console.log('work');
  };

  return (
    <div>
      <Input placeholder="введите имя" value={userName} onChange={handleInput} fullWidth={true} />
      <ButtonOutlined onClick={saveSettings} text="сохранить" m="10px" />
    </div>
  );
};

export default UserSettings;
