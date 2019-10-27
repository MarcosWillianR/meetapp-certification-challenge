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

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: ${FontSize36};
      color: #fff;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 50px;
      border-radius: 4px;
      font-size: ${FontSize20};
      color: #fff;
      padding: 0 22px;
      background-color: ${MainColor};
      font-weight: bold;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${darken(0.03, MainColor)};
      }

      svg {
        margin-right: 15px;
      }
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
    margin-top: 30px;
  }
`;

export const Loading = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: ${FontSize36};
  color: #fff;
  font-weight: bold;
  margin-top: 120px;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-size: ${FontSize18};
    margin-right: 20px;
    color: #b5b5b5;
    font-weight: normal;
  }
`;

export const Time = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 5px;

  span {
    font-size: ${FontSize20};
    font-weight: bold;
    color: #fff;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const NoMeetupMessage = styled.strong`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: ${FontSize36};
  color: #fff;
  margin-top: 120px;
`;
