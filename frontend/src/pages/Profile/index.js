import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { MdControlPoint } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', (old_password, field) =>
    old_password
      ? field.required('Informe sua senha nova') &&
        field.min(6, 'Informe uma senha maior do que 6 caracteres')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirme sua senha nova')
          .oneOf(
            [Yup.ref('password')],
            'As senhas não coincidem, verifique e tente novamente'
          )
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input name="old_password" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          <MdControlPoint color="#fff" size={26} />
          Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
