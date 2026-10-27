import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const serverIp = "http://100.90.196.58:3000";

type ServerStatus = {
  status: string;
};

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<ServerStatus>();
  const [error, setError] = useState<string>();

  const getData = async () => {
    try {
      const res = await fetch(serverIp + "/health");
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

  useEffect(() => {
    getData();
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