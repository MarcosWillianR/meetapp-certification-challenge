import styled from 'styled-components';
import { MainColor } from '~/styles/global';

export const Container = styled.div`
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 100%;
      height: 300px;
      background: ${MainColor};
    }

    input {
      display: none;
    }
  }
`;
