import { SAVE_TOKEN, LOGOUT } from '../constants/index';

const initialState = {
  tokenId: '',
};

const TokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        tokenId: action.tokenId,
      };
    case LOGOUT:
      return {
        ...state,
        tokenId: '',
      };
    default:
      return state;
  }
};

export default TokenReducer;
