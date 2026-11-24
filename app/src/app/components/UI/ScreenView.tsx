import { colors } from "@/app/constants/colors";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { sizes } from "@/app/constants/sizes";

export default function ScreenView({ children }: PropsWithChildren) {
 return   <LinearGradient
colors={[colors.backgroundTop, colors.backgroundBottom]}  
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={styles.root}
>
   <SafeAreaView style={styles.screen}>
    {children}
</SafeAreaView></LinearGradient>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
},
screen: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: sizes.gap,
  }
});
