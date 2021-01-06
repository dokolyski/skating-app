import { Test, TestingModule } from '@nestjs/testing';
import { VeryficationController } from './veryfication.controller';

describe('VeryficationController', () => {
  let controller: VeryficationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeryficationController],
    }).compile();

    controller = module.get<VeryficationController>(VeryficationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
