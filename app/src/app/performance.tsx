import { StyleSheet } from "react-native";
import ScreenView from "./components/UI/ScreenView";
import Top from "./components/UI/Top";

export default function Overview() {
  const onRefreshHandler = () => {
    console.log("Refresh");
  };

  return (
    <ScreenView>
      <Top hostname="SuperServer" onRefresh={onRefreshHandler} />
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
