import { View, Text, StyleSheet } from "react-native";
import { NativeTabs } from "expo-router/native-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenView from "./components/UI/ScreenView";

export default function Overview() {
  return (
    <ScreenView>
      <Text>Performance</Text>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
