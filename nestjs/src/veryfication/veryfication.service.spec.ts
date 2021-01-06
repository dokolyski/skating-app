import { Test, TestingModule } from '@nestjs/testing';
import { VeryficationService } from './veryfication.service';

describe('VeryficationService', () => {
  let service: VeryficationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeryficationService],
    }).compile();

    service = module.get<VeryficationService>(VeryficationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
