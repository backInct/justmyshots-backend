import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^[0-9a-zA-Z_-]+$/.test(value);
        },
        defaultMessage() {
          return 'Username может содержать только буквы, цифры, "_" или "-"';
        },
      },
    });
  };
}
