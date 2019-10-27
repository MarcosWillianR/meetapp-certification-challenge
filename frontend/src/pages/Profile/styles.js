import styled from 'styled-components';
import { darken } from 'polished';
import {
  FontSize20,
  FontSize14,
  MainColor,
  DefaultSidesPadding,
  maxWidth,
} from '~/styles/global';

export const Container = styled.div`
  width: 100%;
  max-width: ${maxWidth};
  margin: 60px auto;
  padding: 0 ${DefaultSidesPadding};

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

    hr {
      margin: 10px 0 20px 0;
      border-color: rgba(255, 255, 255, 0.3);
    }

    span {
      margin: -5px 0 10px;
      align-self: baseline;
      color: ${MainColor};
      font-size: ${FontSize14};
      font-weight: bold;
    }

    button {
      align-self: flex-end;
      padding: 0 22px;
      background-color: ${MainColor};
      font-weight: bold;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${darken(0.03, MainColor)};
      }

      svg {
        margin-right: 15px;
        vertical-align: middle;
      }
    }
  }
`;
