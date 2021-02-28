import { SAVE_TOKEN, LOGOUT } from '../constants/index';

export function SaveToken(tokenId) {
  return {
    type: SAVE_TOKEN,
    tokenId,
  };
}

export function Logout() {
  return {
    type: LOGOUT,
  };
}
