// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export default class TripCalendarController {
  constructor(tripCalendarPlay) {
    this.tripCalendarPlay = tripCalendarPlay;
    this.adultsValue = 1;
    this.teenValue = 0;
    this.fiveValue = 0;
  }

  init() {
    this.tripCalendarPlay.addSwapListeners(this.onSwap.bind(this));

    this.tripCalendarPlay.addAdultsMinusListeners(this.onAdultsMinus.bind(this));
    this.tripCalendarPlay.addAdultsPlusListeners(this.onAdultsPlus.bind(this));
    this.tripCalendarPlay.addTeenMinusListeners(this.onTeenMinus.bind(this));
    this.tripCalendarPlay.addTeenPlusListeners(this.onTeenPlus.bind(this));
    this.tripCalendarPlay.addFiveMinusListeners(this.onFiveMinus.bind(this));
    this.tripCalendarPlay.addFivePlusListeners(this.onFivePlus.bind(this));
    this.tripCalendarPlay.addDateToListeners(this.onDateTo.bind(this));
    // this.tripCalendarPlay.addDateFromListeners(this.onDateFrom.bind(this));

    // экземпляр объекта moment
    const NowMoment = moment();

    // задание параметров полей даты ( задаётся минимальаня дата у полей даты)
    this.tripCalendarPlay.dateValue('dateTo', 'min', NowMoment.format('YYYY-MM-DD'));
    this.tripCalendarPlay.dateValue('dateFrom', 'min', NowMoment.format('YYYY-MM-DD'));
  }

  // метод кнопки поменять местами направления
  onSwap(value) {
    const { calendarFrom, calendarTo } = value;
    this.tripCalendarPlay.calendarText(calendarTo, calendarFrom);
  }

  onAdultsMinus() {
    if (this.adultsValue > 0) {
      this.adultsValue -= 1;
      this.tripCalendarPlay.inputValue('adultsInput', this.adultsValue);
    }
  }

  onAdultsPlus() {
    this.adultsValue += 1;
    this.tripCalendarPlay.inputValue('adultsInput', this.adultsValue);
  }

  onTeenMinus() {
    if (this.teenValue > 0) {
      this.teenValue -= 1;
      this.tripCalendarPlay.inputValue('teenInput', this.teenValue);
    }
  }

  onTeenPlus() {
    this.teenValue += 1;
    this.tripCalendarPlay.inputValue('teenInput', this.teenValue);
  }

  onFiveMinus() {
    if (this.fiveValue > 0) {
      this.fiveValue -= 1;
      this.tripCalendarPlay.inputValue('fiveInput', this.fiveValue);
    }
  }

  onFivePlus() {
    this.fiveValue += 1;
    this.tripCalendarPlay.inputValue('fiveInput', this.fiveValue);
  }

  // метод обрабатываюзий дату туда для изменения даты обратно
  onDateTo(value) {
    this.tripCalendarPlay.dateValue('dateFrom', 'min', value, value);
  }

  // onDateFrom(value) {
  // }
}
