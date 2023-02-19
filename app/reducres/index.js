import {localizeReducer} from 'react-localize-redux';
import {combineReducers} from 'redux';
import Common from './Common';

import Subjects from '../screens/subjects/SubjectReducers';
import BattleNums from '../screens/batttleLevels/BattleReducers';
import BattleMarks from '../screens/battleMarks/BattleMarksReducers';
import Grades from '../screens/grades/GradesReducers';
import Titles from '../screens/titles/TitleReducers';
import TeacherQuote from '../screens/teacherQuotes/TeachersQuotesReducers';
import QuectionMain from '../screens/quectionsMain/QuectionsMainReducers';
import ProfileMain from '../screens/profile/ProfileReducers';

export default combineReducers({
  localize: localizeReducer,
  common: Common,
  subjects: Subjects,
  grades: Grades,
  titles: Titles,
  teacherquote: TeacherQuote,
  quectionmain: QuectionMain,
  profiledata: ProfileMain,
  battlenums: BattleNums,
  battlemarks: BattleMarks
});
