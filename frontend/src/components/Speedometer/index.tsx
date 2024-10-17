import { Easing, View } from "react-native";
import Styles from "./Styles";
import { Defs, Line, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const size = 95;
const cx = size / 2;
const cy = size / 2;
const strokeWidth = 12;
const { PI, cos, sin } = Math;
const r = (size - strokeWidth) / 2;
const startAngle = PI + PI * 0;
const endAngle = 2 * PI - PI * 0;
const A = endAngle - startAngle;

const x1 = cx - r * cos(startAngle);
const y1 = cy - r * sin(startAngle);
const x2 = cx - r * cos(endAngle);
const y2 = cy - r * sin(endAngle);

const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

const Speedometer = () => {
  const progress = useSharedValue(30);
  const circumference = r * A;

  const animatedProps = useAnimatedProps(() => {
    const alpha = ((100 - progress.value) / 100) * circumference;

    return {
      strokeDashoffset: alpha,
    };
  });

  const pointerProps = useAnimatedProps(() => {
    const rotation = interpolate(progress.value, [0, 100], [-120, 120]);
    return {
      transform: `rotate(${rotation} ${cx} ${cy})`,
    };
  });

  useEffect(() => {
    progress.value = withTiming(progress.value, {
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
        {/* Agora o arco colorido é um fundo completo */}
        <AnimatedPath
          fill={"none"}
          stroke={"url(#grad)"}
          strokeWidth={strokeWidth}
          d={d}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        {/* Elemento de progresso */}
        <AnimatedPath
          fill={"none"}
          stroke={"url(#grad)"}
          strokeWidth={strokeWidth}
          d={d}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
        <AnimatedLine
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 10}
          stroke={"black"}
          strokeWidth={4}
          strokeLinecap="round"
          animatedProps={pointerProps}
        />
      </Svg>
    </View>
  );
};

export default Speedometer;
