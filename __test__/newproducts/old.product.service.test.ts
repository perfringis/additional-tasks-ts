import { AppModule } from '../../src/app.module';
import { Test } from '@nestjs/testing';
import { OldProductService } from '../../src/newproducts/old.product.service';
import { OldProductRepository } from '../../src/newproducts/old.product.repository';
import { OldProduct } from '../../src/newproducts/old.product';

describe('OldProductServiceTest', () => {
  let oldProductService: OldProductService;
  let oldProductRepository: OldProductRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = await module.createNestApplication().init();

    oldProductService = app.get<OldProductService>(OldProductService);
    oldProductRepository = app.get<OldProductRepository>(OldProductRepository);
  });

  afterEach(async () => {
    await oldProductRepository.delete({});
  });

  test('can list all products descriptions', async () => {
    // given
    await oldProductRepository.save(productWithDesc('desc1', 'longDesc1'));
    await oldProductRepository.save(productWithDesc('desc2', 'longDesc2'));

    // when
    const allDescriptions: string[] =
      await oldProductService.findAllDescriptions();

    // then
    expect(allDescriptions).toContain('desc1 *** longDesc1');
    expect(allDescriptions).toContain('desc2 *** longDesc2');
  });

  test('can decrement counter', async () => {
    // given
    const oldProduct: OldProduct = await oldProductRepository.save(
      productWithPriceAndCounter(10, 10),
    );

    // when
    await oldProductService.decrementCounter(oldProduct.getSerialNumber());

    // then
    expect(
      await oldProductService.getCounterOf(oldProduct.getSerialNumber()),
    ).toEqual(9);
  });

  test('can increment counter', async () => {
    // given
    const oldProduct: OldProduct = await oldProductRepository.save(
      productWithPriceAndCounter(10, 10),
    );

    // when
    await oldProductService.incrementCounter(oldProduct.getSerialNumber());

    // then
    expect(
      await oldProductService.getCounterOf(oldProduct.getSerialNumber()),
    ).toEqual(11);
  });

  test('can change price', async () => {
    // given
    const oldProduct: OldProduct = await oldProductRepository.save(
      productWithPriceAndCounter(10, 10),
    );

    // when
    await oldProductService.changePriceOf(oldProduct.getSerialNumber(), 0);

    // then
    expect(
      await oldProductService.getCounterOf(oldProduct.getSerialNumber()),
    ).toEqual(0);
  });

  const productWithPriceAndCounter = (price: number, counter: number) => {
    return new OldProduct(price, 'desc', 'longDesc', counter);
  };

  const productWithDesc = (desc: string, longDesc: string) => {
    return new OldProduct(10, desc, longDesc, 10);
  };
});
