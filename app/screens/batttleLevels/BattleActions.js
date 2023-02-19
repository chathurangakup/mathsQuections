import {put, takeLatest} from 'redux-saga/effects';

import {GET_BATTLE_NUMS, GET_BATTLE_NUMS_OK,GET_USER_BATTLE_MARKS_OK,GET_USER_BATTLE_MARKS} from './BattleActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getBattleNumbers = function* (payload) {
  console.log("getBattleNumberspayload", payload)
  const language = yield getLanguageId();
  const updateController = 'battlenum' + language;
  const response = yield ajaxCall(
    createUrl(updateController, 'releventBattleNumShowTeachers'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_BATTLE_NUMS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getBattleNumbersSaga() {
  yield takeLatest(GET_BATTLE_NUMS, getBattleNumbers);
}


const getReleventUserBattleMarks= function* (payload) {
  console.log("getReleventUserBattleMarks", payload)
  const language = yield getLanguageId();
  const updateController = 'battlemark' + language;
  const response = yield ajaxCall(
    createUrl(updateController, 'releventUsersBattleMarks'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_USER_BATTLE_MARKS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getReleventUserBattleMarksSaga() {
  yield takeLatest(GET_USER_BATTLE_MARKS, getReleventUserBattleMarks);
}
