import { Transform, TransformFnParams } from 'class-transformer';

export const TrimDecorator = (options?: { each?: boolean }) => {
  return Transform(({ value }: TransformFnParams) => {
    if (options?.each && Array.isArray(value)) {
      return value.map((val) => (typeof val === 'string' ? val.trim() : val));
    }
    return typeof value === 'string' ? value.trim() : value;
  });
};
