import { View } from "react-native";
import Styles from "./Styles";
import { Defs, Line, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

interface SpeedometerProps {
  progress: number;
}

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

const Speedometer: React.FC<SpeedometerProps> = ({ progress }) => {
  // Ajuste para compartilhar o valor do progresso
  const sharedProgress = useSharedValue(progress);

  // Atualize o sharedProgress sempre que o valor de progress mudar
  useEffect(() => {
    sharedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progress]);

  const circumference = r * A;

  const animatedProps = useAnimatedProps(() => {
    "worklet";
    const alpha = ((100 - sharedProgress.value) / 100) * circumference;
    return {
      strokeDashoffset: alpha, // Atualiza a animação da barra com o progresso
    };
  });

  const pointerProps = useAnimatedProps(() => {
    "worklet";
    const rotation = interpolate(sharedProgress.value, [0, 100], [-120, 120]);
    return {
      transform: `rotate(${rotation} ${cx} ${cy})`, // Rotaciona o ponteiro conforme o progresso
    };
  });

  // Usando useDerivedValue para garantir que o valor seja reativo
  const animatedProgress = useDerivedValue(() => {
    console.log("Valor animado compartilhado: ", sharedProgress.value);
    return sharedProgress.value; // Pode ser usado como um valor reativo
  });

  

  return (
    <View style={Styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0">
            <Stop offset="0%" stopColor="#fed7aa" />
            <Stop offset="100%" stopColor="#ea580c" />
          </LinearGradient>
        </Defs>
        <AnimatedPath
          fill={"none"}
          stroke={"url(#grad)"}
          strokeWidth={strokeWidth}
          d={d}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
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
          y2={cy - r + 10} // Ajuste para a linha iniciar no centro
          stroke={"black"}
          strokeWidth={4}
          strokeLinecap="round"
          animatedProps={pointerProps} // Aplique a animação com a rotação
        />
      </Svg>
    </View>
  );
};

export default Speedometer;
