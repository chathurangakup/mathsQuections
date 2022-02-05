import {put, takeLatest} from 'redux-saga/effects';

import {GET_TITLES, GET_TITLES_OK} from './TitleActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getTitles = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'title' + language;

  console.log('payload', payload);

  const response = yield ajaxCall(
    createUrl(updateController, 'releventTitlesAll'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_TITLES_OK,
    payload: {
      data: response,
    },
  });
};

export function* getTitlesSaga() {
  yield takeLatest(GET_TITLES, getTitles);
}
