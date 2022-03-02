import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding:0;

    &:focus,
    &:active {
      outline: none;
   }
  
  body, input {
    color: #172b4d;
    font-family: 'Roboto', sans-serif;
  }
`;
