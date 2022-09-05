import {all} from 'redux-saga/effects';

import {getSubjectsSaga} from '../screens/subjects/SubjectActions';
import {getBattleNumbersSaga, getReleventUserBattleMarksSaga} from '../screens/batttleLevels/BattleActions';
import {getAllStudentsInfoSaga,getAllStudentsMarksInfoSaga} from '../screens/battleMarks/BattleMarksActions';
import {getGradesSaga} from '../screens/grades/GradesActions';
import {getTitlesSaga} from '../screens/titles/TitleActions';
import {getTeachersQuotesSaga} from '../screens/teacherQuotes/TeachersQuotesActions';
import {
  getQuectionsSaga,
  getBattleQuectionsSaga,
  getReviewsSaga,
  addReviewSaga,
  deleteReviewSaga,
  showAdverticeSaga,
} from '../screens/quectionsMain/QuectionsMainActions';
import {
  getUserInfoSaga,
  updateUserInfoSaga,
} from '../screens/profile/ProfileActions';



export default function* rootSaga() {
  yield all([
    getSubjectsSaga(),
    getGradesSaga(),
    getTitlesSaga(),
    getTeachersQuotesSaga(),
    getQuectionsSaga(),
    getBattleQuectionsSaga(),
    getReviewsSaga(),
    addReviewSaga(),
    getUserInfoSaga(),
    updateUserInfoSaga(),
    deleteReviewSaga(),
    showAdverticeSaga(),
    getBattleNumbersSaga(),
    getReleventUserBattleMarksSaga(),
    getAllStudentsInfoSaga(),
    getAllStudentsMarksInfoSaga()
  ]);
}

// export const initSagas = sagaMiddleware =>
//   sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));