import {put, takeLatest} from 'redux-saga/effects';

import {GET_QUECTIONS, GET_QUECTIONS_OK} from './QuectionsMainActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getQuections = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'teachersquection' + language;
  console.log('quections', payload);

  const response = yield ajaxCall(
    createUrl(updateController, 'getAllQuection'),
    payload.payload,
    true,
    'POST',
    true,
  );
  console.log('quectionsResp', response);

  yield put({
    type: GET_QUECTIONS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getQuectionsSaga() {
  yield takeLatest(GET_QUECTIONS, getQuections);
}
