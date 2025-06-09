import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customTrimText', async: false })
export class TrimValidator implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'вы передали пустую строку!';
  }
}

export function IsTrimmed(validationOptions?: ValidationOptions) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      name: 'isTrimmed',
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      validator: TrimValidator,
    });
  };
}
