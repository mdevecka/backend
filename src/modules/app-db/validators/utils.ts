import { isUUID } from 'class-validator';
import { registerDecorator, ValidationOptions, getFromContainer } from 'class-validator';
import { AdminRepository } from '../repositories';

export function createExistsValidator(func: (repo: AdminRepository, id: string) => Promise<boolean>, errorMessage: string) {
  return function(validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          async validate(id: string) {
            if (!isUUID(id))
              return false;
            const repo = getFromContainer(AdminRepository);
            return func(repo, id);
          },
          defaultMessage() {
            return errorMessage;
          }
        }
      });
    }
  }
}
