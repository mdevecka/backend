import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminRepository } from '@modules/app-db/repositories';
import { AuthGuard } from '@modules/auth/helpers';
import { AuthService } from '@modules/auth/services';

describe('AdminController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let adminController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: AdminRepository, useValue: {} },
        { provide: AuthGuard, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    }).compile();
    adminController = app.get(AdminController);
  });

  describe('admin', () => {
    it('test', () => {
      expect(true).toBe(true);
    });
  });

});
