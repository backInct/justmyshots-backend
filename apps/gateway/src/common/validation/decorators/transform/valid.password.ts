import { registerDecorator, ValidationOptions } from 'class-validator';

const SPECIALS = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          if (!/[0-9]/.test(value)) return false; // цифра
          if (!/[A-Z]/.test(value)) return false; // заглавная
          if (!/[a-z]/.test(value)) return false; // строчная
          const specialsRe = new RegExp(
            `[${SPECIALS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`,
          );
          if (!specialsRe.test(value)) return false; // спецсимвол
          return true;
        },
        defaultMessage() {
          return 'Пароль должен содержать цифру, заглавную и строчную буквы, а также спецсимвол.';
        },
      },
    });
  };
}
