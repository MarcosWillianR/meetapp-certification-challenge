import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import BannerInput from './BannerInput';
import DateInput from './DateInput';

import { Container } from './styles';

// import a from '~/store/modules/meetup/actions';

export default function MeetupEdit() {
  const dispatch = useDispatch();

  function handleSubmit(data) {}

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <DateInput name="date" />
        <Input name="localization" placeholder="Localização" />
        <button type="submit">
          <MdControlPoint color="#fff" size={26} />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}
