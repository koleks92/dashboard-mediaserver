import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/app/constants/colors";

type RingGaugeProps = PropsWithChildren<{
  value: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
}>;

export default function RingGauge({
  value,
  size = 64,
  strokeWidth = 6,
  color = colors.mint,
  children,
}: RingGaugeProps) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Keep the value between 0 and 1, and guard against NaN
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : 0;
  const offset = circumference * (1 - safeValue);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          rotation={-90}
          origin={`${center}, ${center}`}
          fill="none"
        />
      </Svg>

      {/* Centered content, such as the percentage */}
      <View style={[StyleSheet.absoluteFill, styles.center]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
});