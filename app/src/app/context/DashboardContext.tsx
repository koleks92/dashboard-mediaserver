import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  PropsWithChildren,
  useEffect,
  useContext,
} from "react";

const serverIp = "http://100.90.196.58:3000";

// Context
const DashboardContext = createContext<SystemContextValue | undefined>(
  undefined,
);

// useDashboard hook
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }
  return context;
}

// Types
type ServerStatus = {
  status: string;
};

type SystemStatus = {
  cpuLoad: number;
  cpuBrand: string;
  cpuCores: number;
  cpuThreads: number;
  cpuSpeed: number;
  memTotal: number;
  memAvailable: number;
  memUsed: number;
  uptime: number;
  hostname: string;
  ip: string;
  disks: { mount: string; total: number; used: number; free: number }[];
  lastUpdated: number;
};

type SystemContextValue = {
  serverStatus: ServerStatus | undefined;
  systemStatus: SystemStatus | undefined;
  loading: boolean;
  error: string | undefined;
  onRefreshHandler: () => Promise<void>;
};

// Provider
const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>();
  const [systemStatus, setSystemStatus] = useState<SystemStatus>();
  const [error, setError] = useState<string>();

  // Refresh data
  const onRefreshHandler = async () => {
    const answer = await getHealth();

    if (answer?.status === "ok") {
      const systemAnswer = await getSystem();
    }
  };

  // Check server health
  const getHealth = async () => {
    setLoading(true);
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
      return answer;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Get system data
  const getSystem = async () => {
    setLoading(true);
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
      const time = Date.now();
      setSystemStatus({
        ...answer,
        lastUpdated: time,
      });
      return answer;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Get health and system data on start
  useEffect(() => {
    onRefreshHandler();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ serverStatus, systemStatus, loading, error, onRefreshHandler }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
