export default class ListEditPlay {
  constructor() {
    this.container = null; // для контейнера в DOM

    this.saveListeners = [];
    this.cancelListener = [];
    this.removeListeners = [];
    this.editorListeners = [];

    this.nameProducts = [];

    this.editor = false;
  }

  // присваиваем классу контейнер
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  // проверка на наличие контейнера
  checkBinding() {
    if (this.container === null) {
      throw new Error('ListEditPlay not bind to DOM');
    }
  }

  // отрисовка HTML
  drawUI() {
    this.checkBinding();

    this.container.innerHTML = `
        <H2>
          Задача № 2<br>
          Редактор списка* (задача со звёздочкой)
        </H2>
        <div class="list-edit-container">
          <div class="list-edit-title">
            <p>Товары</p>
            <a href="" class="list-edit-add">+</a>
          </div>
  
          <div class="list-edit-products-container">
            <div class="list-edit-header">
  
              <div class="list-edit-product">
                <div class="list-edit-name">
                  Название
                </div>
                <div class="list-edit-price">
                  Стоимость
                </div>
                <div class="list-edit-actions">
                  Действия
                </div>
              </div>
  
            </div>
  
            <div class="list-edit-products">
  
            </div>
          </div>
        </div>
      `;

    this.container.classList.add('task');
    this.popupEditor();

    this.addProduct = this.container.querySelector('.list-edit-add');
    this.products = this.container.querySelector('.list-edit-products');
    this.modal = this.container.querySelector('.list-edit-modal');

    this.addProduct.addEventListener('click', (event) => this.onClickAddProduct(event));
  }

  addProductHtml(name, price) {
    const priceNumber = Number(price).toFixed(2);

    // this.products.innerHTML = '';
    const div = document.createElement('div'); // создаём див
    div.innerHTML = `
        <div class="list-edit-name">${name}</div>
        <div class="list-edit-price">${priceNumber}</div>
        <div class="list-edit-actions">
          <a href="" class="list-edit-editor"></a>
          <a href="" class="list-edit-remove"></a>
        </div>
      `;
    div.classList.add('list-edit-product');
    div.querySelector('.list-edit-editor').addEventListener('click', (event) => this.onEditor(event));
    div.querySelector('.list-edit-remove').addEventListener('click', (event) => this.onRemove(event));

    this.products.appendChild(div);

    this.countProductName();
  }

  popupEditor() {
    const div = document.createElement('div'); // создаём див
    div.innerHTML = `
        <form data-id="modal" class="list-edit-form">
          <div class="list-edit-form-label">
            <label class="list-edit-form-label-text" for="editor-label-name">Название</label>
            <input class="list-edit-form-label-field" type="text" name="label-name" id="editor-label-name">
          </div>
          <div class="list-edit-form-label">
            <label class="list-edit-form-label-text" for="editor-label-price">Стоимость</label>
            <input class="list-edit-form-label-field" type="numper" name="label-price" id="editor-label-price">
          </div>
          <button data-id="editor-save" class="btn list-edit-btn">Сохранить</button>
          <button data-id="editor-cancel" class="btn list-edit-btn" type="button">Закрыть</button>
        </form>
      `;
    div.classList.add('list-edit-modal');

    this.productName = div.querySelector('#editor-label-name');
    this.productPrice = div.querySelector('#editor-label-price');
    this.productSave = div.querySelector('[data-id=editor-save]');
    this.productCancel = div.querySelector('[data-id=editor-cancel]');

    this.productSave.addEventListener('click', (event) => this.onSave(event));
    this.productCancel.addEventListener('click', (event) => this.onCancelAddProduct(event));
    this.productName.addEventListener('focus', () => this.onFocusClear('productName'));
    this.productPrice.addEventListener('focus', () => this.onFocusClear('productPrice'));

    this.container.appendChild(div);
  }

  addSaveListeners(callback) {
    this.saveListeners.push(callback);
  }

  addCancelListeners(callback) {
    this.cancelListener.push(callback);
  }

  addRemoveListeners(callback) {
    this.removeListeners.push(callback);
  }

  addEditorListeners(callback) {
    this.editorListeners.push(callback);
  }

  onClickAddProduct(event) {
    event.preventDefault();
    this.modal.classList.toggle('list-edit-modal-active');
  }

  onCancelAddProduct(event) {
    event.preventDefault();
    this.modalClose();
  }

  onEditor(event) {
    event.preventDefault();

    const product = event.target.closest('.list-edit-product');

    this.editor = product;

    const name = product.querySelector('.list-edit-name').textContent;
    const price = product.querySelector('.list-edit-price').textContent;

    this.modal.classList.toggle('list-edit-modal-active');

    this.editorListeners.forEach((o) => o.call(null, { name, price }));
  }

  onSave(event) {
    event.preventDefault();
    const name = this.productName.value;
    const price = this.productPrice.value;
    const condition = this.editor;

    let oldName = '';

    if (condition) {
      oldName = condition.querySelector('.list-edit-name').textContent;
    }

    const value = {
      name,
      price,
      condition,
      oldName,
    };

    this.saveListeners.forEach((o) => o.call(null, value));
  }

  modalClose() {
    this.modalValue('', '');
    this.modal.classList.remove('list-edit-modal-active');
    this.editor = false;
  }

  // changeProduct(name, price) {
  //   const product = this.editor;

  //   const nameProduct = product.querySelector('.list-edit-name');
  //   const priceProduct = product.querySelector('.list-edit-price');

  //   nameProduct.textContent = name;
  //   priceProduct.textContent = Number(price).toFixed(2);
  // }

  onRemove(event) {
    event.preventDefault();
    const product = event.target.closest('.list-edit-product');
    const name = product.querySelector('.list-edit-name').textContent;

    this.removeListeners.forEach((o) => o.call(null, name));
  }

  onFocusClear(input) {
    this.message(input, '');
    this.errorInputRemove(input);
  }

  countProductName() {
    const nodeProducts = this.products.querySelectorAll('.list-edit-name');

    this.nameProducts = [];

    for (let i = 0; i < nodeProducts.length; i += 1) {
      this.nameProducts.push(nodeProducts[i].textContent);
    }
  }

  modalValue(name, price) {
    this.productName.value = name;
    this.productPrice.value = price;

    this.message('productName', '');
    this.message('productPrice', '');
    this.errorInputRemove('productName');
    this.errorInputRemove('productPrice');
  }

  // removeProductHtml(product) {
  //   this.products.removeChild(product);
  //   this.countProductName();
  // }

  // текст в инпуте с ошибкой
  message(input, text) {
    this[input].placeholder = text;
  }

  // удаляем инпуту класс ошибки
  errorInputRemove(input) {
    this[input].classList.remove('error-add');
  }

  // добавляем инпуту класс ошибки
  errorInputAdd(input, text) {
    this[input].value = '';
    this.message(input, text);
    this[input].classList.add('error-add');
  }

  clearHTML() { // очищаем container в DOM
    this.container.classList.remove('task');
    this.container.innerHTML = '';
  }

  clearPruductList() {
    this.products.innerHTML = '';
  }
}
