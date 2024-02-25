import { Test, TestingModule } from '@nestjs/testing';
import { RtdbController } from './rtdb.controller';

describe('RtdbController', () => {
  let controller: RtdbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtdbController],
    }).compile();

    controller = module.get<RtdbController>(RtdbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
