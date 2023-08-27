import checkProduct from './checkProduct';
import isNumber from './isNumber';

export default class ListEditControl {
  constructor(listEditPlay) {
    this.listEditPlay = listEditPlay; // класс который управляет DOM
    this.productMemory = [ // массив с продуктами
      { name: 'iPhone XR', price: 60000 },
      { name: 'Samsung Galaxy S10+', price: 80000 },
      { name: 'Huawei View', price: 50000 },
    ];
  }

  init() {
    this.listEditPlay.addSaveListeners(this.onSave.bind(this));
    this.listEditPlay.addRemoveListeners(this.onRemove.bind(this));
    this.listEditPlay.addEditorListeners(this.onEditor.bind(this));

    this.renderingProduct(); // отрисовка продуктов
  }

  // кнопка сохранить
  onSave(value) {
    const {
      name,
      price,
      condition,
      oldName,
    } = value;

    const checkPrice = isNumber(price); // проверка цены на число

    const check = checkProduct(this.productMemory, name); // проверка на наличии товара в списке

    if (name === '') {
      this.listEditPlay.errorInputAdd('productName', 'Нужно заполнить имя продукта');
    }

    if (!checkPrice) {
      this.listEditPlay.errorInputAdd('productPrice', 'Нужно заполнить цену продукта');
    }

    if (check >= 0 && !condition) {
      this.listEditPlay.errorInputAdd('productName', 'Этот продукт уже есть в списке');
    }

    if (condition && checkPrice) {
      const index = checkProduct(this.productMemory, oldName);
      // this.listEditPlay.changeProduct(name, price);
      this.productMemory[index].name = name;
      this.productMemory[index].price = price;
      this.listEditPlay.modalClose();

      this.renderingProduct();
    }

    if (check === -1 && checkPrice && !condition) {
      // this.listEditPlay.addProductHtml(name, price);
      this.productMemory.push({ name, price });
      this.listEditPlay.modalClose();

      this.renderingProduct();
    }
  }

  // кнопка уалить
  onRemove(name) {
    const index = checkProduct(this.productMemory, name);

    this.productMemory.splice(index, 1);

    this.renderingProduct();
  }

  // кнопка изменить
  onEditor(value) {
    const { name, price } = value;
    this.listEditPlay.modalValue(name, price);
  }

  // отрисовка продуктов
  renderingProduct() {
    this.listEditPlay.clearPruductList();

    for (let i = 0; i < this.productMemory.length; i += 1) {
      const { name, price } = this.productMemory[i];
      this.listEditPlay.addProductHtml(name, price);
    }
  }
}
