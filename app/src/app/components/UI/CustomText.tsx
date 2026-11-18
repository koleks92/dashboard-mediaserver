import { colors } from "@/app/constants/colors";
import { PropsWithChildren } from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export default function CustomText({ children, style }: TextProps) {
  return <Text style={[styles.root, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    root: {
        fontFamily: "Manrope_400Regular",
        color: colors.text

    }
})
