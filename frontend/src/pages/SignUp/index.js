import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FaMugHot } from 'react-icons/fa';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Informe seu nome completo'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Informe seu email'),
  password: Yup.string()
    .min(6, 'Sua senha precisa conter no mínimo 6 caracteres')
    .required('Informe uma senha com mais de 6 dígitos'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = ({ name, email, password }) => {
    dispatch(signUpRequest(name, email, password));
  };

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">
          {loading ? <FaMugHot size={22} /> : 'Criar conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
