import {DEFALUT, UPDATE_LOADING_SPINNER_STATE} from '../actyonTypes/Common';

const initialState = {
  defaultResult: 0,
  loading: false,
  slideUpPanelConfig: {
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
    default:
      return state;
  }
};
