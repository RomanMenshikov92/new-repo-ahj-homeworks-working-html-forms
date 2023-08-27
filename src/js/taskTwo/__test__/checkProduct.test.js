import checkProduct from '../checkProduct';

test('test checkProduct ARR Throw', () => {
  const expected = 'not an array passed to checkProduct';
  const received = () => {
    checkProduct('');
  };

  expect(received).toThrow(expected);
});

test('test checkProduct result true', () => {
  const expected = 1;
  const products = [
    { name: 'iPhone XR', price: 60000 },
    { name: 'Huawei View', price: 50000 },
  ];

  const received = checkProduct(products, 'Huawei View');

  expect(received).toEqual(expected);
});

test('test checkProduct result -1', () => {
  const expected = -1;
  const products = [
    { name: 'iPhone XR', price: 60000 },
    { name: 'Huawei View', price: 50000 },
  ];
  const received = checkProduct(products, 'test');

  expect(received).toEqual(expected);
});
