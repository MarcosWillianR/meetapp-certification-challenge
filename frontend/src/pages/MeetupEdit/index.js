import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import BannerInput from './BannerInput';
import DateInput from './DateInput';

import { Container } from './styles';

import {
  updateMeetupRequest,
  getMeetupsRequest,
} from '~/store/modules/meetup/actions';

export default function MeetupEdit({ match }) {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.meetups);
  const { id } = match.params;

  const selectedMeetup = meetup && meetup.filter(m => m.id === Number(id));

  function handleSubmit(data) {
    dispatch(updateMeetupRequest(data, id));
  }

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, []); //eslint-disable-line

  return (
    <Container>
      {selectedMeetup && (
        <Form onSubmit={handleSubmit}>
          <BannerInput name="banner_id" image={selectedMeetup[0].photo} />
          <Input
            name="title"
            placeholder={selectedMeetup[0].title || 'Título do Meetup'}
          />
          <Input
            multiline
            name="description"
            placeholder={selectedMeetup[0].description || 'Descrição completa'}
          />
          <DateInput dateS={parseISO(selectedMeetup[0].date)} name="date" />
          <Input
            name="localization"
            placeholder={selectedMeetup[0].localization || 'Localização'}
          />
          <button type="submit">
            <MdControlPoint color="#fff" size={26} />
            Salvar Meetup
          </button>
        </Form>
      )}
    </Container>
  );
}
