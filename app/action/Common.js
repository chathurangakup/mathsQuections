import {DEFALUT} from '../actyonTypes/Common';

export const defaultData = () => {
  return async dispatch => {
    dispatch({type: DEFALUT, payload: true});
  };
};
