import {localizeReducer} from 'react-localize-redux';
import {combineReducers} from 'redux';
import Common from './Common';

import Subjects from '../screens/subjects/SubjectReducers';
import Grades from '../screens/grades/GradesReducers';
import Titles from '../screens/titles/TitleReducers';
import TeacherQuote from '../screens/teacherQuotes/TeachersQuotesReducers';

export default combineReducers({
  localize: localizeReducer,
  common: Common,
  subjects: Subjects,
  grades: Grades,
  titles: Titles,
  teacherquote: TeacherQuote,
});
