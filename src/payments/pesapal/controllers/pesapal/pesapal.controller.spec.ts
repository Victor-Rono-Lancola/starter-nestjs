import { Test, TestingModule } from '@nestjs/testing';
import { PesapalController } from './pesapal.controller';

describe('PesapalController', () => {
  let controller: PesapalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesapalController],
    }).compile();

    controller = module.get<PesapalController>(PesapalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
