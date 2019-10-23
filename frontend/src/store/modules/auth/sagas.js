import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.organizer) {
      toast.error('Usuário não possui um meetapp cadastrado');
      yield put(signFailure());

      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    toast.error(
      'Parece que você digitou algum dado errado, verifique e tente novamente'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
