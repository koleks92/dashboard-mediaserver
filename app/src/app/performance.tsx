import { StyleSheet } from "react-native";
import ScreenView from "./components/UI/ScreenView";
import TopBar from "./components/UI/TopBar";
import StatusBar from "./components/UI/StautsBar";

export default function Overview() {
  const onRefreshHandler = () => {
    console.log("Refresh");
  };

  return (
    <ScreenView>
      <TopBar hostname="SuperServer" onRefresh={onRefreshHandler} />
      <StatusBar />
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
