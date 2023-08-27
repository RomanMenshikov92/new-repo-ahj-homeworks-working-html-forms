/* eslint-disable no-console */
import ListEditPlay from '../ListEditPlay';
import ListEditControl from '../ListEditControl';

jest.mock('../ListEditPlay');
beforeEach(() => { jest.resetAllMocks(); });

const listEditPlay = new ListEditPlay();
listEditPlay.clearPruductList.mockReturnValue(console.log('вызван .clearPruductList'));
listEditPlay.addProductHtml.mockReturnValue(console.log('вызван .addProductHtml'));

test('ListEditControl constructor', () => {
  const listEditControl = new ListEditControl('test');
  const expected = {
    listEditPlay: 'test',
    productMemory: [
      { name: 'iPhone XR', price: 60000 },
      { name: 'Samsung Galaxy S10+', price: 80000 },
      { name: 'Huawei View', price: 50000 },
    ],
  };

  const resived = {
    listEditPlay: listEditControl.listEditPlay,
    productMemory: listEditControl.productMemory,
  };

  expect(resived).toEqual(expected);
});

test('ListEditControl onRemove', () => {
  const listEditControl = new ListEditControl(listEditPlay);
  const expected = {
    productMemory: [
      { name: 'iPhone XR', price: 60000 },
      { name: 'Huawei View', price: 50000 },
    ],
  };

  listEditControl.onRemove('Samsung Galaxy S10+');

  const resived = {
    productMemory: listEditControl.productMemory,
  };

  expect(resived).toEqual(expected);
});

// и тд и тп.
