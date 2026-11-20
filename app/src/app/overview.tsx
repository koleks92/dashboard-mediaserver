import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ScreenView from "./components/UI/ScreenView";
import CustomText from "./components/UI/CustomText";
import Top from "./components/UI/Top";

const serverIp = "http://100.90.196.58:3000";

type ServerStatus = {
  status: string;
};

type SystemStatus = {
  cpuLoad: number;
  memTotal: number;
  memAvailable: number;
  hostname: string;
  disks: { mount: string; total: number; used: number; free: number }[];
};

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<ServerStatus>();
  const [systemStatus, setSystemStatus] = useState<SystemStatus>();
  const [error, setError] = useState<string>();

  const onRefreshHandler = () => {
    console.log("Refresh");
  };

  const getHealth = async () => {
    try {
      const res = await fetch(serverIp + "/health", {
        headers: {
          Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_TOKEN,
        },
      });
      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      const answer: ServerStatus = await res.json();
      setServerStatus(answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const getSystem = async () => {
    try {
      const res = await fetch(serverIp + "/system", {
        headers: {
          Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_TOKEN,
        },
      });
      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      const answer: SystemStatus = await res.json();
      setSystemStatus(answer);
      console.log(answer.disks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check connection
    getHealth();
    // Get system data
    getSystem();
  }, []);

  if (loading) {
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
      <Top hostname="SuperServer" onRefresh={onRefreshHandler} />
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
