import { Transform, TransformFnParams } from 'class-transformer';

export const Trim = (options?: { each?: boolean }) => {
  return Transform(({ value }: TransformFnParams) => {
    if (options?.each && Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value.map((val) => (typeof val === 'string' ? val.trim() : val));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return typeof value === 'string' ? value.trim() : value;
  });
};
