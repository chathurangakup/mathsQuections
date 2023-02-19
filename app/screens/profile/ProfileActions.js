import {put, takeLatest} from 'redux-saga/effects';

import {
  GET_USER_INFO,
  GET_USER_INFO_OK,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_OK,
} from './ProfileActionsTypes';

import {createUrl, ajaxCall} from '../../lib/Utils';

const getUserInfo = function* (payload) {
  const updateController = 'users';
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, 'usrdetails/' + payload.userId),
    payload.payload,
    true,
    'GET',
    true,
  );
  yield put({
    type: GET_USER_INFO_OK,
    payload: {
      data: response,
    },
  });
};

export function* getUserInfoSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfo);
}

const updateUserInfo = function* (payload) {
  const updateController = 'users';
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, 'updateuserInfo/' + payload.userId),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: UPDATE_USER_INFO_OK,
    payload: {
      data: response,
    },
  });
};

export function* updateUserInfoSaga() {
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
}
