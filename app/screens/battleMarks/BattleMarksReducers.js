import {
  GET_BATTLE_NUMS_OK,
  GET_USER_BATTLE_MARKS_OK,
} from './BattleMarksActionTypes';

const initialState = {
  defaultResult: 0,
  battlenumConfig: undefined,
  userBattlenInfoConfig:undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BATTLE_NUMS_OK:
      return {...state, battlenumConfig: action.payload};
    case GET_USER_BATTLE_MARKS_OK:
      return {...state, userBattlenInfoConfig: action.payload};
    default:
      return state;
  }
};
