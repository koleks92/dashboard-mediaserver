import { StyleSheet } from "react-native";
import ScreenView from "./components/UI/ScreenView";
import TopBar from "./components/UI/TopBar";
import StatusBar from "./components/UI/StautsBar";
import { useDashboard } from "./context/DashboardContext";
import CustomText from "./components/UI/CustomText";


export default function Performance() {
  const { loading, error, onRefreshHandler, systemStatus, serverStatus } =
    useDashboard();

  if (loading || !systemStatus || !serverStatus) {
    return (
      <ScreenView>
        <CustomText>Loading...</CustomText>
      </ScreenView>
    );
  }

  if (error) {
    return (
      <ScreenView>
        <CustomText>Error: {error}</CustomText>
      </ScreenView>
    );
  }

  return (
    <ScreenView>
      <TopBar hostname={systemStatus.hostname} onRefresh={onRefreshHandler} />
      <StatusBar status={serverStatus.status === "ok"} ip={systemStatus.ip} lastUpdated={systemStatus.lastUpdated}/>
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
