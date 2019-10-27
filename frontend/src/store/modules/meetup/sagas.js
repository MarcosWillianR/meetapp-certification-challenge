import { takeLatest, put, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import {
  meetupUpdateSuccess,
  meetupFailure,
  getMeetupsSuccess,
} from './actions';

export function* updateMeetup({ payload }) {
  try {
    const response = yield call(api.put, `meetup/${payload.id}`, payload.data);

    toast.success('Meetup editado com sucesso!');

    return yield put(meetupUpdateSuccess(response.data));
  } catch (error) {
    toast.error('Não foi possível criar o Meetup, tente novamente mais tarde');

    return yield put(meetupFailure());
  }
}

export function* getMeetup() {
  try {
    const response = yield call(api.get, 'organizing');

    yield put(getMeetupsSuccess(response.data));
  } catch (error) {
    toast.error(error);
  }
}

export function* cancelMeetup({ payload }) {
  try {
    yield call(api.delete, `meetup/${payload.id}`);

    toast.success('Meetup cancelado com sucesso!');

    history.push('/');
  } catch (error) {
    toast.error('Erro ao tentar cancelar o meetup');
  }
}

export default all([
  takeLatest('@meetup/CANCEL_REQUEST', cancelMeetup),
  takeLatest('@meetup/GET_REQUEST', getMeetup),
  takeLatest('@Meetup/UPDATE_REQUEST', updateMeetup),
]);
