import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import BannerInput from './BannerInput';
import DateInput from './DateInput';

import { Container } from './styles';

import { createMeetupRequest } from '~/store/modules/meetup/actions';

export default function MeetupEdit() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createMeetupRequest(data));
  }

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
