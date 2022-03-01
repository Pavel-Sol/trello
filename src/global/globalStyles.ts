import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding:0;
  }
  
  body, input {
    color: #172b4d;
    font-family: 'Roboto', sans-serif;
  }
`;
