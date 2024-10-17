import { View, Text } from "react-native";
import Styles from "./Styles";

const size = 200;
const cx = size / 2;
const cy = size / 2;
const strokeWidth = 20;
const { PI, cos, sin } = Math;
const r = (size - strokeWidth) / 2;
const startAngle = PI + PI * 0.25;
const endAngle = PI + PI * 0.25;
const x1 = cx - r * cos(startAngle);
const y1 = cy - r * sin(startAngle);
const x2 = cx - r * cos(endAngle);
const y2 = cy - r * sin(endAngle);

const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

const Speedometer = () => {
  return <View style={Styles.container}>
    <Text>aawdaw</Text>
  </View>;
};

export default Speedometer;
