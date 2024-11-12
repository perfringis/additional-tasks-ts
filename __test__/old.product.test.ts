import { NotAcceptableException } from '@nestjs/common';
import { Counter } from 'src/newproducts/counter';
import { OldProduct } from 'src/newproducts/old.product';
import { Price } from 'src/newproducts/price';

describe('OldProduct Test', () => {
  test('price cannot be null', () => {
    expect(() => new Price(null)).toThrow(
      new NotAcceptableException('Invalid price'),
    );
  });

  test('can increment counter if price is positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      10,
      'description',
      'long description',
      10,
    );

    // when
    oldProduct.incrementCounter();

    // then
    expect(oldProduct.getCounter()).toEqual(new Counter(11));
  });

  test('cannot increment counter if price is not positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      0,
      'description',
      'long description',
      10,
    );

    // expect
    expect(() => oldProduct.incrementCounter()).toThrow(
      new NotAcceptableException('Invalid price'),
    );
  });

  test('can december counter if price is positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      10,
      'description',
      'long description',
      10,
    );

    // when
    oldProduct.decrementCounter();

    // then
    expect(oldProduct.getCounter()).toEqual(new Counter(9));
  });

  test('cannot decrement counter if price is not positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      0,
      'description',
      'long description',
      0,
    );

    // expect
    expect(() => oldProduct.decrementCounter()).toThrow(
      new NotAcceptableException('Invalid price'),
    );
  });

  test('can change price if counter is positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      0,
      'description',
      'long description',
      10,
    );

    // when
    oldProduct.changePriceTo(10);

    // then
    expect(oldProduct.getPrice()).toEqual(new Price(10));
  });

  test('cannot change price if counter is not positive', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(
      0,
      'description',
      'long description',
      10,
    );

    // when
    oldProduct.changePriceTo(10);

    // then
    expect(oldProduct.getPrice()).toEqual(new Price(10));
  });

  test('can format description', () => {
    expect(new OldProduct(10, 'short', 'long', 10).formatDesc()).toEqual(
      'short *** long',
    );
    expect(new OldProduct(10, 'short', '', 10).formatDesc()).toEqual('');
    expect(new OldProduct(10, '', 'long', 10).formatDesc()).toEqual('');
  });

  test('can change char in description', () => {
    // given
    const oldProduct: OldProduct = new OldProduct(10, 'short', 'long', 10);

    // when
    oldProduct.replaceCharFromDesc('s', 'z');

    // then
    expect(oldProduct.formatDesc()).toEqual('zhort *** long');
  });
});
