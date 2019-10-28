import { takeLatest, put, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.old_password ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Mudanças no perfil', 'perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert(
      'Mudanças no perfil',
      'erro ao tentar atualizar o perfil, tente novamente mais tarde'
    );
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
