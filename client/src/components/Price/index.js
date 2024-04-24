import { Typography } from "antd";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

const Price = ({ price }) => {
  return <Typography.Text>{roundToTwo(price)}</Typography.Text>;
};

export default Price;
