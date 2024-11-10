import { ValidationOptions, ValidationTypes, registerDecorator } from 'class-validator';

export function AllowEmpty(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: { validate() { return true; } },
      constraints: [
        (object: any) => {
          return object[propertyName] !== "";
        },
      ],
    });
  }
}
