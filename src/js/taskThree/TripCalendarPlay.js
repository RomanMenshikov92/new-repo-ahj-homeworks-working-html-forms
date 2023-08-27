/* eslint-disable no-console */
export default class TripCalendarPlay {
  constructor() {
    this.container = null; // для контейнера в DOM

    this.swapListeners = [];

    this.adultsMinusListeners = [];
    this.adultsPlusListeners = [];

    this.teenMinusListeners = [];
    this.teenPlusListeners = [];

    this.fiveMinusListeners = [];
    this.fivePlusListeners = [];

    this.dateToListeners = [];
    // this.dateFromListeners = [];
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
      throw new Error('GamePlay not bind to DOM');
    }
  }

  // отрисовка HTML
  drawUI() {
    this.checkBinding();

    // html шаблон
    this.container.innerHTML = `
        <H2>
          Задача № 3<br>
          Trip Calendar* (задача со звёздочкой)
        </H2>
        <div class="calendar-container">
          <div class="calendar-title calendar-block">
            <p>Поиск билетов</p>
          </div>
  
          <div class="calendar-block">
            <label class="calendar-label-text">Откуда:</label>
            <input data-id="calendar-from" class="calendar-label-input" type="text" name="calendar-from">
            <a href="" class="calendar-swap"></a>
          </div>
  
          <div class="calendar-block">
            <label class="calendar-label-text">Куда:</label>
            <input data-id="calendar-to" class="calendar-label-input" type="text" name="calendar-to">
          </div>
  
          <div class="calendar-block">
            <div class="calendar-block-small">
              <label class="calendar-label-text">Взрослые:</label>
              <input data-id="adults-input" class="calendar-label-input" type="text" name="label-adults" value="1" readonly>
              <a href="" data-id="adults-minus" class="calendar-minus"></a>
              <a href="" data-id="adults-plus" class="calendar-plus"></a>
            </div>
  
            <div class="calendar-block-small">
              <label class="calendar-label-text">Дети до 10 лет</label>
              <input data-id="children-teen-input" class="calendar-label-input" type="text" name="label-children-teen" value="0" readonly>
              <a href="" data-id="children-teen-minus" class="calendar-minus"></a>
              <a href="" data-id="children-teen-plus" class="calendar-plus"></a>
            </div>
  
            <div class="calendar-block-small">
              <label class="calendar-label-text">Дети до 5 лет</label>
              <input data-id="children-five-input" class="calendar-label-input" type="text" name="label-children-five" value="0" readonly>
              <a href="" data-id="children-five-minus" class="calendar-minus"></a>
              <a href="" data-id="children-five-plus" class="calendar-plus"></a>
            </div>
  
            <div class="calendar-block-small">
              <label class="calendar-label-text">Туда и обратно</label>
              <input data-id="label-thereAndback" class="calendar-label-checkbox" type="checkbox" name="label-thereAndback">
            </div>
          </div>
  
          <div data-id="calendar-block-dates" class="calendar-block">
            <div class="calendar-block-date calendar-date-to">
              <label class="calendar-label-text">Дата:</label>
              <input class="calendar-label-input" data-id="calendar-input-date-to" type="date" name="label-date-to">
            </div>
            <div class="calendar-block-date calendar-date-from">
              <label class="calendar-label-text">Обратно:</label>
              <input class="calendar-label-input" data-id="calendar-input-date-from" type="date" name="label-date-from">
            </div>
            
          </div>
  
          <button data-id="calendar-btn" class="btn calendar-btn">Найти билеты</button>
        </div>
      `;

    this.container.classList.add('task'); // добавления класса задач

    // поле откуда и куда
    this.calendarFrom = this.container.querySelector('[data-id=calendar-from]');
    this.calendarTo = this.container.querySelector('[data-id=calendar-to]');

    this.swap = this.container.querySelector('.calendar-swap'); // кнопка поменять

    // блок Взрослые ( кнопка минус, кнопка плюс, поле ввода)
    this.adultsInput = this.container.querySelector('[data-id=adults-input]');
    this.adultsMinus = this.container.querySelector('[data-id=adults-minus]');
    this.adultsPlus = this.container.querySelector('[data-id=adults-plus]');

    // блок Дети до 10 лет ( кнопка минус, кнопка плюс, поле ввода)
    this.teenInput = this.container.querySelector('[data-id=children-teen-input]');
    this.teenMinus = this.container.querySelector('[data-id=children-teen-minus]');
    this.tennPlus = this.container.querySelector('[data-id=children-teen-plus]');

    // блок Дети до 5 лет ( кнопка минус, кнопка плюс, поле ввода)
    this.fiveInput = this.container.querySelector('[data-id=children-five-input]');
    this.fiveMinus = this.container.querySelector('[data-id=children-five-minus]');
    this.fivePlus = this.container.querySelector('[data-id=children-five-plus]');

    // кнопка Туда и обратно
    this.checkbox = this.container.querySelector('[data-id=label-thereAndback]');

    // два блока с датой туда и обратно
    this.dateToDiv = this.container.querySelector('.calendar-date-to');
    this.dateFromDiv = this.container.querySelector('.calendar-date-from');

    // поля дат туда и обратно
    this.dateTo = this.container.querySelector('[data-id=calendar-input-date-to]');
    this.dateFrom = this.container.querySelector('[data-id=calendar-input-date-from]');

    // события

    // отслеживание клика по кнопке поменять направления
    this.swap.addEventListener('click', (event) => this.onSwap(event));

    // отслеживание изменения кнопки туда и обратно
    this.checkbox.addEventListener('change', (event) => this.onCheckbox(event));

    // отслеживание клика по кнопкам минус и плюс для ввода кол-ва
    this.adultsMinus.addEventListener('click', (event) => this.onAdultsMinus(event));
    this.adultsPlus.addEventListener('click', (event) => this.onAdultsPlus(event));
    this.teenMinus.addEventListener('click', (event) => this.onTeenMinus(event));
    this.tennPlus.addEventListener('click', (event) => this.onTennPlus(event));
    this.fiveMinus.addEventListener('click', (event) => this.onFiveMinus(event));
    this.fivePlus.addEventListener('click', (event) => this.onFivePlus(event));

    // отслеживание изменения поля даты
    this.dateTo.addEventListener('change', (event) => this.onDateTo(event));
    // this.dateFrom.addEventListener('change', (event) => this.onDateFrom(event));
  }

  // методы передающие колбек

  addSwapListeners(callback) {
    this.swapListeners.push(callback);
  }

  addAdultsMinusListeners(callback) {
    this.adultsMinusListeners.push(callback);
  }

  addAdultsPlusListeners(callback) {
    this.adultsPlusListeners.push(callback);
  }

  addTeenMinusListeners(callback) {
    this.teenMinusListeners.push(callback);
  }

  addTeenPlusListeners(callback) {
    this.teenPlusListeners.push(callback);
  }

  addFiveMinusListeners(callback) {
    this.fiveMinusListeners.push(callback);
  }

  addFivePlusListeners(callback) {
    this.fivePlusListeners.push(callback);
  }

  addDateToListeners(callback) {
    this.dateToListeners.push(callback);
  }

  // addDateFromListeners(callback) {
  //   this.dateFromListeners.push(callback);
  // }

  // метод кнопки поменять местами направления
  onSwap(event) {
    event.preventDefault();

    const calendarFrom = this.calendarFrom.value;
    const calendarTo = this.calendarTo.value;

    this.swapListeners.forEach((o) => o.call(null, { calendarFrom, calendarTo }));
  }

  // метод кнопки туда и обратно
  onCheckbox() {
    if (this.checkbox.checked) {
      this.dateToDiv.classList.add('calendar-date-to-active');
      this.dateFromDiv.classList.add('calendar-date-from-active');
    } else {
      this.dateToDiv.classList.remove('calendar-date-to-active');
      this.dateFromDiv.classList.remove('calendar-date-from-active');
    }
  }

  onAdultsMinus(event) {
    event.preventDefault();
    this.adultsMinusListeners.forEach((o) => o.call(null, event));
  }

  onAdultsPlus(event) {
    event.preventDefault();
    this.adultsPlusListeners.forEach((o) => o.call(null, event));
  }

  onTeenMinus(event) {
    event.preventDefault();
    this.teenMinusListeners.forEach((o) => o.call(null, event));
  }

  onTennPlus(event) {
    event.preventDefault();
    this.teenPlusListeners.forEach((o) => o.call(null, event));
  }

  onFiveMinus(event) {
    event.preventDefault();
    this.fiveMinusListeners.forEach((o) => o.call(null, event));
  }

  onFivePlus(event) {
    event.preventDefault();
    this.fivePlusListeners.forEach((o) => o.call(null, event));
  }

  // метод обрабатывающий дату ТУДА
  onDateTo(event) {
    event.preventDefault();
    const dateTo = this.dateTo.value;
    console.log(this.dateTo.min);
    console.log('this.dateTo.min');
    this.dateToListeners.forEach((o) => o.call(null, dateTo));
  }

  // метод обрабатывающий дату ОБРАТНО
  // onDateFrom(event) {
  //   event.preventDefault();
  //   const dateFrom = this.dateFrom.value;
  //   this.dateFromListeners.forEach((o) => o.call(null, dateFrom));
  // }

  // метод, что бы менять значение полей
  inputValue(input, number) {
    this[input].value = number;
  }

  // метод меняющий и настраивающий поля даты
  dateValue(input, maxMin, date, defaultDate = false) {
    if (maxMin === 'max') {
      this[input].max = date;
    }

    if (maxMin === 'min') {
      this[input].min = date;
    }

    if (defaultDate) {
      this[input].value = defaultDate;
    }
  }

  // метод для задания значений полей откуда и куда
  calendarText(valueOne, valueTwo) {
    this.calendarFrom.value = valueOne;
    this.calendarTo.value = valueTwo;
  }

  // очистка HTML
  clearHTML() { // очищаем container в DOM
    this.container.classList.remove('task');
    this.container.innerHTML = '';
  }
}
