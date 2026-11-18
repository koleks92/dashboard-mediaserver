import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NativeTabs } from "expo-router/native-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenView from "./components/UI/ScreenView";
import CustomText from "./components/UI/CustomText";

const serverIp = "http://100.90.196.58:3000";

type ServerStatus = {
  status: string;
};

type SystemStatus = {
  cpuLoad: number;
  memTotal: number;
  memAvailable: number;
  hostname: string;
  uptime: number;
  disks: { mount: string; total: number; used: number; free: number }[];
};

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<ServerStatus>();
  const [systemStatus, setSystemStatus] = useState<SystemStatus>();
  const [error, setError] = useState<string>();

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
        <Text>Loading...</Text>
    </ScreenView>
    );
  }

  if (error) {
    return (
    <ScreenView>
        <Text>Error: {error}</Text>
    </ScreenView>
    );
  }

  return (

    <ScreenView>
      <CustomText>Server status: {serverStatus?.status}</CustomText>
      <CustomText>System status: {systemStatus?.memTotal}</CustomText>
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
