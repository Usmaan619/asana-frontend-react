export const SET_CASHE = (key, value) => localStorage?.setItem(key, value);

export const GET_CASHE = (key) => localStorage?.getItem(key);

export const REMOVE_KEY_CASHE = (key, value) =>
  localStorage?.removeItem(key, value);

export const CLEAR_CASHE = () => localStorage?.clear();

export const getFirstAndLastLatterOfName = (name) => {
  try {
    const words = name.split(" ");
    const firstLetters = words?.map((word) => word?.charAt(0))?.join("");

    return firstLetters;
  } catch (error) {
    console.log("error: ", error);
  }
};
