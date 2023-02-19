import {
  DEFALUT,
  UPDATE_LOADING_SPINNER_STATE,
  LOGIN,
  CHECK_LOGIN,
  LOGOUT,
  SHOW_ADVERTICE_MODAL,
  HIDE_ADVERTICE_MODAL,
} from '../actyonTypes/Common';

const initialState = {
  defaultResult: 0,
  loading: false,
  slideUpPanelConfig: {
    visible: false,
    btnCancel: () => {},
    isLoggedIn: false,
  },
  adverticeModalConfig: {
    visible: false,
    btnCancel: () => {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEFALUT:
      return {...state, defaultResult: initialState.defaultResult};
    case UPDATE_LOADING_SPINNER_STATE:
      return {...state, loading: action.payload};
    case 'SHOW_BOTTOM_ALERT':
      return {...state, slideUpPanelConfig: action.payload};
    case 'HIDE_BOTTOM_ALERT':
      return {...state, slideUpPanelConfig: initialState.slideUpPanelConfig};
    case SHOW_ADVERTICE_MODAL:
      return {...state, adverticeModalConfig: action.payload};
    case HIDE_ADVERTICE_MODAL:
      return {
        ...state,
        adverticeModalConfig: initialState.adverticeModalConfig,
      };
    case LOGIN:
      return {...state, isLoggedIn: action.payload};
    case CHECK_LOGIN:
      return {...state, isLoggedIn: action.payload};
    case LOGOUT:
      return {...state, isLoggedIn: action.payload};
    default:
      return state;
  }
};
