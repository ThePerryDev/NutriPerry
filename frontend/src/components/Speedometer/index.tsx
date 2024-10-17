import { Easing, View } from "react-native";
import Styles from "./Styles";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const size = 95;
const cx = size / 2;
const cy = size / 2;
const strokeWidth = 12;
const { PI, cos, sin } = Math;
const r = (size - strokeWidth) / 2;
const startAngle = PI + PI * 0;
const endAngle = 2 * PI - PI * 0; // Modifique o ângulo final para criar um arco visível
const A = endAngle - startAngle; // Ângulo do arco

const x1 = cx - r * cos(startAngle);
const y1 = cy - r * sin(startAngle);
const x2 = cx - r * cos(endAngle);
const y2 = cy - r * sin(endAngle);

const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`; // Ajuste o sweep-flag para 1

const Speedometer = () => {
  const progress = useSharedValue(30);
  const circumference = 2 * PI * r;

  const animatedProps = useAnimatedProps(() => {
    const alpha = circumference - (progress.value / 100) * circumference;

    return {
      strokeDashoffset: alpha,
    };
  });

  useEffect(() => {
    progress.value = withTiming(100, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  return (
    <View style={Styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0">
            <Stop offset="0%" stopColor="#fed7aa" />
            <Stop offset="100%" stopColor="#ea580c" />
          </LinearGradient>
        </Defs>
        <Path
          fill={"none"}
          stroke={"#e2e2e8"}
          strokeWidth={strokeWidth}
          d={d}
        />
        <AnimatedPath
          fill={"none"}
          stroke={"url(#grad)"}
          strokeWidth={strokeWidth}
          d={d}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

export default Speedometer;
