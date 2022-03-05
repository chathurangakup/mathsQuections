import {all} from 'redux-saga/effects';

import {getSubjectsSaga} from '../screens/subjects/SubjectActions';
import {getGradesSaga} from '../screens/grades/GradesActions';
import {getTitlesSaga} from '../screens/titles/TitleActions';
import {getTeachersQuotesSaga} from '../screens/teacherQuotes/TeachersQuotesActions';
import {
  getQuectionsSaga,
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
    getReviewsSaga(),
    addReviewSaga(),
    getUserInfoSaga(),
    updateUserInfoSaga(),
    deleteReviewSaga(),
    showAdverticeSaga(),
  ]);
}
