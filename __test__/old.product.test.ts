import { NotAcceptableException } from '@nestjs/common';
import { OldProduct } from 'src/newproducts/old.product';
import { Price } from 'src/newproducts/price';

describe('class OldProduct -> function decrementCounter', () => {
  test('should not take product from the sock when price is not provided', () => {
    expect(
      () =>
        new OldProduct(
          null,
          'sample description',
          'sample long description',
          null,
        ),
    ).toThrow(new NotAcceptableException('Invalid price'));
  });

  test('should not take product from the sock when price is 0.0', () => {
    // expect
    expect(
      () =>
        new OldProduct(
          0.0,
          'sample description',
          'sample long description',
          null,
        ),
    ).toThrow(new NotAcceptableException('Invalid price'));
  });

  test('should not take product from the sock when stock is not provided', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      null,
    );

    // expect
    expect(() => oldProduct.decrementCounter()).toThrow(
      new NotAcceptableException('null counter'),
    );
  });

  test('should not take product from the sock when stock has no items', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      0,
    );

    // expect
    expect(() => oldProduct.decrementCounter()).toThrow(
      new NotAcceptableException('Negative counter'),
    );
  });

  test('should not take product from the sock when stock is negative', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      -1,
    );

    // expect
    expect(() => oldProduct.decrementCounter()).toThrow(
      new NotAcceptableException('Negative counter'),
    );
  });

  test('should take product from the sock when stock has at least one product', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      1,
    );

    // when
    oldProduct.decrementCounter();

    // then
    expect(oldProduct.counter).toEqual(0);
  });
});

describe('class OldProduct -> function incrementCounter', () => {
  test('should not add product to the sock when price is not provided', () => {
    // expect
    expect(
      () =>
        new OldProduct(
          null,
          'sample description',
          'sample long description',
          null,
        ),
    ).toThrow(new NotAcceptableException('Invalid price'));
  });

  test('should not take product from the sock when price is 0.0', () => {
    // expect
    expect(
      () =>
        new OldProduct(
          0.0,
          'sample description',
          'sample long description',
          null,
        ),
    ).toThrow(new NotAcceptableException('Invalid price'));
  });

  test('should not add product to the sock when stock is not provided', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      null,
    );

    // expect
    expect(() => oldProduct.incrementCounter()).toThrow(
      new NotAcceptableException('null counter'),
    );
  });

  test('should not add product to the sock when stock is negative after adding a product', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      -2,
    );

    // expect
    expect(() => oldProduct.incrementCounter()).toThrow(
      new NotAcceptableException('Negative counter'),
    );
  });

  test('should add product to the sock when stock is missing one product', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      -1,
    );

    // when
    oldProduct.incrementCounter();

    // then
    expect(oldProduct.counter).toEqual(0);
  });

  test('should add product to the sock when stock is empty', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      0,
    );

    // when
    oldProduct.incrementCounter();

    // then
    expect(oldProduct.counter).toEqual(1);
  });

  test('should add product to the sock when stock has 1 product', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      1,
    );

    // when
    oldProduct.incrementCounter();

    // then
    expect(oldProduct.counter).toEqual(2);
  });
});

describe('class OldProduct -> function changePriceTo', () => {
  test('should not change price when stock is not provided', () => {
    // when
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      null,
    );

    // expect
    expect(() => oldProduct.changePriceTo(new Price(2))).toThrow(
      new NotAcceptableException('null counter'),
    );
  });

  test('should not change price when stock has 0 items', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      0,
    );

    // when
    oldProduct.changePriceTo(new Price(99.0));

    // then
    expect(oldProduct.getPrice()).toEqual(new Price(1));
  });

  test('should not change price when stock has missing items', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      -1,
    );

    // when
    oldProduct.changePriceTo(new Price(99.0));

    // then
    expect(oldProduct.getPrice()).toEqual(new Price(1));
  });

  test('should not change price when provided new price is null', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      1,
    );

    // expect
    expect(() => oldProduct.changePriceTo(null)).toThrow(
      new NotAcceptableException('new price null'),
    );
  });

  test('should change price when new price is provided and stock has at least one item', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'sample description',
      'sample long description',
      1,
    );

    // when
    oldProduct.changePriceTo(new Price(99.0));

    // then
    expect(oldProduct.getPrice()).toEqual(new Price(99.0));
  });
});

describe('class OldProduct -> function replaceCharFromDesc', () => {
  test('should not replace words in description and long description when description and long description is not provided', () => {
    // expect
    expect(() => new OldProduct(1, null, null, 1)).toThrow(
      new NotAcceptableException('null or empty desc'),
    );
  });

  test('should not replace words in description and long description when description and long description is empty', () => {
    // expect
    expect(() => new OldProduct(1, '', '', 1)).toThrow(
      new NotAcceptableException('null or empty desc'),
    );
  });

  test('should replace words in description and long description', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'old description',
      'old long description',
      1,
    );

    // when
    oldProduct.replaceCharFromDesc('old', 'new');

    // then
    expect(oldProduct.getDescription().getDesc()).toEqual('new description');
    expect(oldProduct.getDescription().getLongDesc()).toEqual(
      'new long description',
    );
  });
});

describe('class OldProduct -> function formatDesc', () => {
  test('should return formatted description when description and long description is present', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      1,
      'description',
      'long description',
      1,
    );

    // when
    const formattedDescription: string = oldProduct.formatDesc();

    // then
    expect(formattedDescription).toEqual('description *** long description');
  });
});
