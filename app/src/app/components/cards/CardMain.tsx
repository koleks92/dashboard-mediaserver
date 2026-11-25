import { colors } from "@/app/constants/colors";
import { sizes } from "@/app/constants/sizes";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function CardMain({ children }: PropsWithChildren) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    padding: sizes.padding,
    gap: sizes.gap
  },
});
