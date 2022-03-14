import styled from 'styled-components';

export const ButtonStyled = styled('button')<{
  mode?: 'primary' | 'secondary' | undefined;
}>`
  ${(props) => {
    switch (props.mode) {
      case 'primary':
        return `
          background-color: rgb(0, 121, 191);
          color: white;
          &:hover {
            background-color: rgb(72, 178, 240);
          }
        `;

      case 'secondary':
        return `
          background-color: transparent;
          color: #5e6c84;
          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        `;
      default:
        return `
          background-color: rgb(0, 121, 191);
          color: white;
          &:hover {
            background-color: rgb(72, 178, 240);
          }
        `;
    }
  }}

  cursor: pointer;
  height: 32px;
  border-radius: 3px;
  border: none;
  transition: all 0.3s ease;
  padding: 0 5px;
`;
