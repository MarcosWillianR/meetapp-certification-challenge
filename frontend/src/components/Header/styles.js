import styled from 'styled-components';
import { darken } from 'polished';
import {
  FontSize20,
  FontSize18,
  MainColor,
  DefaultSidesPadding,
} from '~/styles/global';

export const Container = styled.header`
  width: 100%;
  height: 92px;
  padding: 0 ${DefaultSidesPadding};
  background-color: rgba(0, 0, 0, 0.3);

  nav {
    width: 100%;
    height: 100%;
    max-width: 1220px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const UserInfos = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: ${FontSize20};
      font-weight: bold;
      color: #fff;

      margin-bottom: 5px;
    }

    a {
      align-self: flex-end;
      font-size: ${FontSize18};
      color: #fff;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }

  button {
    padding: 12px 24px;
    margin-left: 40px;

    font-size: ${FontSize20};
    font-weight: bold;
    color: #fff;

    border-radius: 4px;
    background-color: ${MainColor};
    transition: background-color 0.3s;

    &:hover {
      background-color: ${darken(0.03, MainColor)};
    }
  }
`;
