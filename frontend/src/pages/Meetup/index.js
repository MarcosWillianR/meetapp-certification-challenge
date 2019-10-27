import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever, MdCreate, MdEvent, MdRoom } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import {
  getMeetupsRequest,
  cancelMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, ButtonsContainer } from './styles';

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  const selectedMeetup =
    meetups && meetups.filter(m => m.id === Number(match.params.id));

  useEffect(() => {
    dispatch(getMeetupsRequest());
  }, []); //eslint-disable-line

  function handleVerifyPast(e) {
    const { past } = selectedMeetup[0];

    if (e.target.innerText === 'Editar' && past) {
      return toast.error('Não é possível editar um meetup que já aconteceu.');
    }

    if (e.target.innerText === 'Cancelar' && !past) {
      return dispatch(cancelMeetupRequest(selectedMeetup[0].id));
    }

    if (e.target.innerText === 'Cancelar' && past) {
      return toast.error('Você não pode cancelar um Meetup que já aconteceu.');
    }

    return history.push(`/meetup/edit/${selectedMeetup[0].id}`);
  }

  return (
    <Container>
      {selectedMeetup && (
        <>
          <header>
            <h1>{selectedMeetup[0].title}</h1>
            <ButtonsContainer>
              <button type="button" onClick={e => handleVerifyPast(e)}>
                <MdCreate size={28} color="#fff" />
                Editar
              </button>
              <button type="button" onClick={e => handleVerifyPast(e)}>
                <MdDeleteForever size={28} color="#fff" />
                Cancelar
              </button>
            </ButtonsContainer>
          </header>
          <img src={selectedMeetup[0].photo} alt="" />
          <p>{selectedMeetup[0].description}</p>
          <footer>
            <time>
              <MdEvent size={18} color="#b5b5b5" />
              {selectedMeetup[0].dateFormatted}
            </time>
            <span>
              <MdRoom size={18} color="#b5b5b5" />
              {selectedMeetup[0].localization}
            </span>
          </footer>
        </>
      )}
    </Container>
  );
}
