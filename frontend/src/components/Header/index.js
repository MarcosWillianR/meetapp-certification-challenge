import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, UserInfos } from './styles';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const { name } = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <UserInfos>
          <div>
            <strong>{name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </UserInfos>
      </nav>
    </Container>
  );
}
