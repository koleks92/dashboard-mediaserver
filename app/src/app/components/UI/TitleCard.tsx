import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

export default function TitleCard({ children }: PropsWithChildren) {
  return (
    <View style={styles.root}>
      <CustomText bold>{children}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
});
