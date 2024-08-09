import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminRepository } from '@modules/app-db/repositories';

describe('AdminController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let adminController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: AdminRepository, useValue: {} },
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
