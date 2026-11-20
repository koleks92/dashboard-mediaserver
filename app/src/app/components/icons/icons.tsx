import React from "react";
import { ColorValue } from "react-native";
import Svg, { Path, Rect, Circle, Ellipse } from "react-native-svg";

export type IconName =
  | "activity"
  | "cpu"
  | "database"
  | "gauge"
  | "hard-drive"
  | "info"
  | "refresh"
  | "server"
  | "thermometer"
  | "wifi";

const shapes: Record<IconName, React.ReactNode> = {
  activity: <Path d="M3 12h4l2.5-7 5 14 2.5-7h4" />,
  cpu: (
    <>
      <Rect x="7" y="7" width="10" height="10" rx="2" />
      <Path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3M10 10h4v4h-4z" />
    </>
  ),
  database: (
    <>
      <Ellipse cx="12" cy="5" rx="8" ry="3" />
      <Path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  gauge: (
    <>
      <Path d="M4.9 19a9 9 0 1 1 14.2 0" />
      <Path d="m12 13 4-4M6.5 15.5h.01M17.5 15.5h.01M12 6v.01" />
    </>
  ),
  "hard-drive": (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Path d="M3 14h18M7 17h.01M11 17h.01" />
    </>
  ),
  info: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 11v5M12 8h.01" />
    </>
  ),
  refresh: (
    <Path d="M20 11a8 8 0 0 0-14.8-3M4 4v4h4M4 13a8 8 0 0 0 14.8 3M20 20v-4h-4" />
  ),
  server: (
    <>
      <Rect x="3" y="4" width="18" height="6" rx="2" />
      <Rect x="3" y="14" width="18" height="6" rx="2" />
      <Path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
    </>
  ),
  thermometer: (
    <>
      <Path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" />
      <Path d="M12 9v7" />
    </>
  ),
  wifi: <Path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01" />,
};

type IconProps = { name: IconName; size?: number; color?: ColorValue };

export function Icon({ name, size = 20, color = "#FFFFFF" }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "#FFFFFF"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[name]}
    </Svg>
  );
}
