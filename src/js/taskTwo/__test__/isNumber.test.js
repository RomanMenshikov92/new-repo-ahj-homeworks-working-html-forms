import isNumber from '../isNumber';

test.each([
  [-100, false],
  [0, false],
  ['1a', false],
  [1, true],
  [1.1, true],
  ['1,1', false],
])(
  ('test isNumber value = %s, result = %s'),
  (number, expected) => {
    const received = isNumber(number);

    expect(received).toEqual(expected);
  },
);
