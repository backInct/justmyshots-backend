import { TransformFnParams } from 'class-transformer';

export const parseBool = ({ obj, key }: TransformFnParams): boolean => {
  return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
};
