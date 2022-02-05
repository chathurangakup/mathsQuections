import {all} from 'redux-saga/effects';

import {getSubjectsSaga} from '../screens/subjects/SubjectActions';
import {getGradesSaga} from '../screens/grades/GradesActions';
import {getTitlesSaga} from '../screens/titles/TitleActions';
import {getTeachersQuotesSaga} from '../screens/teacherQuotes/TeachersQuotesActions';

export default function* rootSaga() {
  yield all([
    getSubjectsSaga(),
    getGradesSaga(),
    getTitlesSaga(),
    getTeachersQuotesSaga(),
  ]);
}
