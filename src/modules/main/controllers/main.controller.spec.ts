import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from '../services';
import { EvaGalleryRepository } from '@modules/app-db/repositories';

describe('MainController', () => {

  let mainController: MainController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [
        MainService,
        { provide: EvaGalleryRepository, useValue: {} },
      ],
    }).compile();
    mainController = app.get<MainController>(MainController);
  });

  describe('main', () => {
    it('test getHello', () => {
      expect(mainController.getHello()).toBe('Warp field stabilized!');
    });
    it('test getEnv', () => {
      expect(mainController.getEnv()).toBe('test');
    });
  });

});
