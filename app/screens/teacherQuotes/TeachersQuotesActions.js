import {put, takeLatest} from 'redux-saga/effects';

import {
  GET_TEACHERS_QUOTES,
  GET_TEACHERS_QUOTES_OK,
} from './TeachersQuotesActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getTeachersQuotes = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'teachersquotes' + language;
  console.log('getTeachersQuotes', getTeachersQuotes);

  const response = yield ajaxCall(
    createUrl(updateController, 'getQuoteWithDetails'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_TEACHERS_QUOTES_OK,
    payload: {
      data: response,
    },
  });
};

export function* getTeachersQuotesSaga() {
  yield takeLatest(GET_TEACHERS_QUOTES, getTeachersQuotes);
}
