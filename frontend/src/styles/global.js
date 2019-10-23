import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const MainColor = '#F94D6A';
export const FontSize20 = '20px';
export const FontSize14 = '14px';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  body, html, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font: 14px 'Roboto', sans-serif; 
  }

  button {
    cursor: pointer;
  }

  input, button {
    border: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;
