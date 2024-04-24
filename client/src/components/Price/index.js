function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Price = ({ price }) => {
  return <span>{roundToTwo(price)}</span>;
};

export default Price;
