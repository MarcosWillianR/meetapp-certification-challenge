import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const MainColor = '#F94D6A';
export const FontSize36 = '36px';
export const FontSize20 = '20px';
export const FontSize18 = '18px';
export const FontSize14 = '14px';
export const DefaultSidesPadding = '22px';
export const maxWidth = '950px';

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

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
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
