import {
  matches,
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';

export function LoginOrEmailValidator(
  dto: {
    loginMinLength: number;
    loginMaxLength: number;
    emailMaxLength: number;
    loginMatch: RegExp;
    emailMatch: RegExp;
  },
  validationOptions?: ValidatorOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        dto.loginMinLength,
        dto.loginMaxLength,
        dto.loginMatch,
        dto.emailMatch,
        dto.emailMaxLength,
      ],
      validator: {
        validate(
          value: any,
          validationArguments: ValidationArguments,
        ): Promise<boolean> | boolean {
          if (typeof value !== 'string') {
            return false;
          }

          if (value.includes('@')) {
            return (
              value.length <= dto.emailMaxLength &&
              matches(value, dto.emailMatch)
            );
          } else {
            return (
              value.length >= dto.loginMinLength &&
              value.length <= dto.loginMaxLength &&
              matches(value, dto.loginMatch)
            );
          }
        },
        defaultMessage(validationArguments: ValidationArguments): string {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          if (validationArguments.value.includes('@')) {
            return `email must be a ${dto.emailMatch} and length small than or equal ${dto.emailMaxLength}`;
          } else {
            return `login must be in range ${dto.loginMinLength}-${dto.loginMaxLength}`;
          }
        },
      },
    });
  };
}
