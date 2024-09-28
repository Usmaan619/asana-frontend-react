export const SET_CASHE = (key, value) => localStorage?.setItem(key, value);

export const GET_CASHE = (key) => localStorage?.getItem(key);

export const REMOVE_KEY_CASHE = (key, value) =>
  localStorage?.removeItem(key, value);

export const CLEAR_CASHE = () => localStorage?.clear();
