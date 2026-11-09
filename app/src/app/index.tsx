import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const serverIp = "http://100.90.196.58:3000";

type ServerStatus = {
  status: string
};

type SystemStatus = {
  cpuLoad: number;
  memTotal: number;
  memAvailable: number;
  hostname: string;
  uptime: number;
};

export default function Index() {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Check connection
    getHealth();
    // Get system data
    getSystem();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Server status: {serverStatus?.status}</Text>
      <Text>System status: {systemStatus?.memTotal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
