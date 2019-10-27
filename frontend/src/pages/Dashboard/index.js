import React, { useEffect, useState } from 'react';
import { MdControlPoint, MdChevronRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import history from '~/services/history';

import { getMeetupsRequest } from '~/store/modules/meetup/actions';

import { Container, Time, Date, NoMeetupMessage, Loading } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meetups) {
      setLoading(false);
    }
  }, [loading, meetups]);

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, []); //eslint-disable-line

  function clearLoading() {
    setTimeout(() => setLoading(false), 4000);
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>

        <button type="button" onClick={() => history.push('/meetup/create')}>
          <MdControlPoint size={24} color="#fff" />
          Novo meetup
        </button>
      </header>

      {loading && <Loading>Carregando...</Loading>}

      <ul>
        {!loading &&
          meetups &&
          meetups.map(meetup => (
            <Time
              key={meetup.id}
              onClick={() => history.push(`/meetup/selected/${meetup.id}`)}
            >
              <span>{meetup.title}</span>
              <Date>
                <strong>{meetup.dateFormatted}</strong>
                <MdChevronRight size={24} color="#fff" />
              </Date>
            </Time>
          ))}
      </ul>

      {loading && !meetups && clearLoading()}

      {!loading && !meetups && (
        <NoMeetupMessage>Você não criou nenhum meetup ainda</NoMeetupMessage>
      )}
    </Container>
  );
}
