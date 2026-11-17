import { View, Text, StyleSheet } from "react-native";
import { NativeTabs } from "expo-router/native-tabs";

export default function Overview() {
  return (
    <View>
      <Text>Performance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
