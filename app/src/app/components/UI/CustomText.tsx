import { colors } from "@/app/constants/colors";
import { Text, TextProps, StyleSheet } from "react-native";
import { rfs } from "../../../../util/responsiveFontSizing";

type CustomTextProps = TextProps & {
  bold?: boolean;
  xxl?: boolean;
  xl?: boolean;
  l?: boolean;
  m?: boolean;
  s?: boolean;
  xs?: boolean;
  secondary?: boolean;
  muted?: boolean;
};

export default function CustomText({
  children,
  bold,
  xxl,
  xl,
  l,
  m,
  s,
  xs,
  secondary,
  muted,
}: CustomTextProps) {
  return (
    <Text
      style={[
        styles.root,
        bold && styles.bold,
        xxl && styles.xxl,
        xl && styles.xl,
        l && styles.l,
        m && styles.m,
        s && styles.s,
        xs && styles.xs,
        secondary && styles.secondary,
        muted && styles.muted,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "Manrope_400Regular",
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  xxl: {
    fontSize: rfs(18),
  },
  xl: {
    fontSize: rfs(16),
  },
  l: {
    fontSize: rfs(14),
  },
  m: {
    fontSize: rfs(12),
  },
  s: {
    fontSize: rfs(10),
  },
  xs: {
    fontSize: rfs(8),
  },
  secondary: {
    color: colors.secondaryText,
  },
  muted: {
    color: colors.mutedText,
  },
});
