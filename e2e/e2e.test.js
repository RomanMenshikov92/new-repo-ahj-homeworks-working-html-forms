/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import server from './e2e.server';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  const baseUrl = 'http://localhost:8888';

  let browser = null;
  let page = null;

  beforeAll(async () => {
    await server.start(); // запуск сервера

    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 50, // скорость
      devtools: false, // show devTools
      args: ['--window-size=640,1080'],
      defaultViewport: {
        width: 640,
        height: 1080,
      },
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close(); // закрытие браузера
    await server.stop(); // остановка сервера
  });

  test('test taskOne Popovers', async () => {
    await page.goto(baseUrl); // переход на страницу

    const taskOne = await page.$('[data-id=taskOne]');

    await taskOne.click();

    await page.waitForSelector('.has-tooltip')
      .then(() => console.log('has-tooltip true'))
      .catch(() => console.log('has-tooltip error'));

    const hasTooltip = await page.$$('.has-tooltip');

    for (let i = 0; i < hasTooltip.length; i += 1) {
      await hasTooltip[i].click();
      await hasTooltip[i].waitForSelector('.tooltip')
        .then(() => console.log('true'))
        .catch(() => console.log('error'));
    }
  });

  test('test taskTwo Add Product Open and Cancel', async () => {
    await page.goto(baseUrl); // переход на страницу

    const taskTwo = await page.$('[data-id=taskTwo]');
    await taskTwo.click();

    const modalAddProduct = await page.$('.list-edit-add');
    await modalAddProduct.click();

    const productCancel = await page.$('[data-id=editor-cancel]');
    await productCancel.click();

    const modal = await page.$('.list-edit-modal');
    const result = await page.evaluate((el) => el.className, modal);

    expect(result).toEqual('list-edit-modal');
  });

  test('test taskTwo Add Product Save New Product', async () => {
    await page.goto(baseUrl); // переход на страницу

    const taskTwo = await page.$('[data-id=taskTwo]');
    await taskTwo.click();

    const modalAddProduct = await page.$('.list-edit-add');
    await modalAddProduct.click();

    const modalNameProduct = await page.$('#editor-label-name');
    await modalNameProduct.type('Samsung S22 Ultra');

    const modalPriceProduct = await page.$('#editor-label-price');
    await modalPriceProduct.type('12000.22');

    const productSave = await page.$('[data-id=editor-save]');
    await productSave.click();

    const products = await page.$('.list-edit-products');
    const arrProduct = await products.$$('.list-edit-product');
    const arrProductLength = arrProduct.length;

    expect(arrProductLength).toEqual(4);
  });

  test('test taskTwo Add Product delete Product', async () => {
    await page.goto(baseUrl); // переход на страницу

    const taskTwo = await page.$('[data-id=taskTwo]');
    await taskTwo.click();

    const deleteProduct = await page.$('.list-edit-remove');
    await deleteProduct.click();

    const products = await page.$('.list-edit-products');
    const arrProduct = await products.$$('.list-edit-product');
    const arrProductLength = arrProduct.length;

    expect(arrProductLength).toEqual(2);
  });

  test('test taskThree checkbox', async () => {
    await page.goto(baseUrl); // переход на страницу

    const taskThree = await page.$('[data-id=taskThree]');
    await taskThree.click();

    const checkbox = await page.$('.calendar-label-checkbox');
    await checkbox.click();

    await page.$('.calendar-date-to-active')
      .then(() => console.log('true'))
      .catch(() => console.log('error'));
    await page.$('.calendar-date-from-active')
      .then(() => console.log('true'))
      .catch(() => console.log('error'));
  });

  test('test taskThree date to and from', async () => {
    await page.goto(baseUrl); // переход на страницу
    const expected = '2023-11-22';

    const taskThree = await page.$('[data-id=taskThree]');
    await taskThree.click();

    const checkbox = await page.$('.calendar-label-checkbox');
    await checkbox.click();

    const dataOne = await page.$('[data-id=calendar-input-date-to]');
    await dataOne.type('22112023');

    const dataTwo = await page.$('[data-id=calendar-input-date-from]');
    const received = await page.evaluate((el) => el.value, dataTwo);

    expect(received).toEqual(expected);
  });
});
