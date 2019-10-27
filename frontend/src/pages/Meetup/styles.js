import styled from 'styled-components';
import { darken } from 'polished';
import {
  MainColor,
  maxWidth,
  DefaultSidesPadding,
  FontSize36,
  FontSize20,
  FontSize18,
} from '~/styles/global';

export const Container = styled.div`
  width: 100%;
  max-width: ${maxWidth};
  padding: 0 ${DefaultSidesPadding};
  margin: 60px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: ${FontSize36};
      color: #fff;
    }
  }

  img {
    width: 100%;
    max-height: 350px;
    margin: 60px 0 30px 0;
  }

  p {
    color: #fff;
    font-size: ${FontSize18};
    margin-bottom: 20px;
    line-height: 1.6;
  }

  footer {
    display: flex;
    align-items: center;
    color: #b5b5b5;
    time {
      margin-right: 60px;
    }
    time,
    span {
      display: flex;
      align-items: baseline;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: 20px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 50px;
    border-radius: 4px;
    font-size: ${FontSize20};
    color: #fff;
    padding: 0 18px;
    font-weight: bold;
    transition: background-color 0.3s;

    svg {
      margin-right: 10px;
    }
  }

  button:nth-of-type(1) {
    background-color: #4dbaf9;

    &:hover {
      background-color: ${darken(0.03, '#4DBAF9')};
    }
  }
  button:nth-of-type(2) {
    background-color: ${MainColor};

    &:hover {
      background-color: ${darken(0.03, MainColor)};
    }
  }
`;
