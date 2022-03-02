import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IColumn } from '../../models';
import { Input } from '../../UIcomponents/Input';
import { ColumnTitle, Container } from './style';

type ColumnPropsType = {
  columnInfo: IColumn;
  setItialState: Dispatch<SetStateAction<IColumn[]>>;
};

const Column: React.FC<ColumnPropsType> = ({ columnInfo, setItialState }) => {
  const [columnsTitle, setColumnsTitle] = useState('');
  const handleColumnsTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnsTitle(e.target.value);
  };

  useEffect(() => {
    setColumnsTitle(columnInfo.title);
  }, [columnInfo.title]);

  const changeСolumnsTitle = () => {
    const columnsFromLS: Array<IColumn> = Array.from(JSON.parse(localStorage.getItem('columns')!));
    console.log(columnInfo.id);
    console.log(
      columnsFromLS.map((el) => {
        if (el.id === columnInfo.id) {
          el.title = columnsTitle;
          return el;
        } else {
          return el;
        }
      }),
    );
  };

  return (
    <Container>
      <ColumnTitle>
        <Input value={columnsTitle} onChange={handleColumnsTitle} onBlur={changeСolumnsTitle} />
      </ColumnTitle>
    </Container>
  );
};

export default Column;
