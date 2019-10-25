import React from 'react';
import { Link } from 'react-router-dom';
import { Container, UserInfos } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  return (
    <Container>
      <nav>
        <img src={logo} alt="Meetapp" />
        <UserInfos>
          <div>
            <strong>Marcos Willian</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button">Sair</button>
        </UserInfos>
      </nav>
    </Container>
  );
}
