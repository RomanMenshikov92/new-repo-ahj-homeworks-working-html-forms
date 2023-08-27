export default function isNumber(value) {
  // return /^\d+$/.test(value);
  const valueNumber = Number(value).toFixed(2);
  const condition = !Number.isNaN(valueNumber) && valueNumber > 0;

  return condition;
}
