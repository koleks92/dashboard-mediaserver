import { StyleSheet } from "react-native";
import ScreenView from "./components/UI/ScreenView";
import CustomText from "./components/UI/CustomText";
import TopBar from "./components/UI/TopBar";
import { useDashboard } from "./context/DashboardContext";
import StatusBar from "./components/UI/StautsBar";

export default function Overview() {
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
      <StatusBar
        status={serverStatus.status === "ok"}
        ip={systemStatus.ip}
        lastUpdated={systemStatus.lastUpdated}
      />
    </ScreenView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
