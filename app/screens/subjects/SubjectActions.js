import {put, takeLatest} from 'redux-saga/effects';

import {GET_SUBJECTS, GET_SUBJECTS_OK} from './SubjectActionTypes';

import {createUrl, ajaxCall} from '../../lib/Utils';

const getSubjects = function* () {
  const response = yield ajaxCall(
    createUrl('subjects', 'allsubjects'),
    {},
    true,
    'GET',
    true,
  );
  yield put({
    type: GET_SUBJECTS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getSubjectsSaga() {
  yield takeLatest(GET_SUBJECTS, getSubjects);
}
