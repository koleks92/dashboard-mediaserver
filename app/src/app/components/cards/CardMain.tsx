import { colors } from "@/app/constants/colors";
import { sizes } from "@/app/constants/sizes";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ReactNode } from "react";

type CardMainProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CardMain({ children, style }: CardMainProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    padding: sizes.padding,
    gap: sizes.gap,
  },
});
