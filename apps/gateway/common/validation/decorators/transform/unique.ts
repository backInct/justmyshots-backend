import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(model: any) {}

  validate(value: unknown, args: ValidationArguments) {
    if (!value) return false;

    const model = args.constraints[0];

    return model;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} должно быть уникальным!`;
  }
}

export function IsUnique(model: any, validationOptions?: ValidationOptions) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueValidator,
      constraints: [model],
    });
  };
}
