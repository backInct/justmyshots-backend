export const userLoginConstraints = {
  minLength: 6,
  maxLength: 30,
  match: /^[a-zA-Z0-9_-]*$/,
};

export const userEmailConstraints = {
  maxLength: 254,
  match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const userPasswordConstraints = {
  minLength: 6,
  maxLength: 20,
};
