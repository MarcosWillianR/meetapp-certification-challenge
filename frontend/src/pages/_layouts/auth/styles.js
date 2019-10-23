import styled from 'styled-components';
import { darken } from 'polished';
import { MainColor, FontSize20, FontSize14 } from '~/styles/global';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(365deg, #402845, #22202c);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;

    margin-top: 40px;

    input,
    button {
      height: 50px;
      border-radius: 4px;
      font-size: ${FontSize20};
      color: #fff;
    }

    input {
      padding: 8px 16px;
      background-color: rgba(0, 0, 0, 0.2);
      margin-bottom: 15px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    span {
      margin: -5px 0 10px;
      align-self: baseline;
      color: ${MainColor};
      font-size: ${FontSize14};
      font-weight: bold;
    }

    button {
      background-color: ${MainColor};
      font-weight: bold;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${darken(0.03, MainColor)};
      }
    }

    a {
      font-size: ${FontSize20};
      font-weight: bold;
      margin-top: 25px;
      opacity: 0.8;
      color: rgba(255, 255, 255, 0.6);
      &:hover {
        opacity: 1;
      }
    }
  }
`;
