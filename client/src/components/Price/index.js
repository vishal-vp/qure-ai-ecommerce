function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Price = ({ price }) => {
  return <div>{roundToTwo(price)}</div>;
};

export default Price;
