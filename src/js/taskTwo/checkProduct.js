// находит индекс по названию
export default function checkProduct(products, productName) {
  if (!Array.isArray(products)) {
    throw new Error('not an array passed to checkProduct');
  }

  // const index = products.indexOf(productName);
  const index = products.findIndex((item) => item.name === productName);
  return index;
}
