import {localizeReducer} from 'react-localize-redux';
import {combineReducers} from 'redux';
import Common from './Common';

export default combineReducers({
    localize: localizeReducer,
    common: Common,   
});

