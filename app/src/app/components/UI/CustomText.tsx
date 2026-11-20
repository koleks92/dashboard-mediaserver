import { colors } from "@/app/constants/colors";
import { Text, TextProps, StyleSheet } from "react-native";
import { rfs } from "../../../../util/responsiveFontSizing";

type CustomTextProps = TextProps & {
  bold?: boolean;
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
  xl,
  l,
  m,
  s,
  xs,
  secondary,
  muted
}: CustomTextProps) {
  return (
    <Text
      style={[
        styles.root,
        bold && styles.bold,
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
  xl: {
    fontSize: rfs(48),
  },
  l: {
    fontSize: rfs(36),
  },
  m: {
    fontSize: rfs(24),
  },
  s: {
    fontSize: rfs(16),
  },
  xs: {
    fontSize: rfs(12),
  },
  secondary: {
    color: colors.secondaryText
  },
  muted: {
    color: colors.mutedText,
  },
});
