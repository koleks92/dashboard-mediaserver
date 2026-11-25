import { colors } from "@/app/constants/colors";
import { sizes } from "@/app/constants/sizes";
import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import LastUpdated from "../extra/LastUpdated";

type StatusBarProps = {
  status: boolean;
  ip: string;
  lastUpdated: number;
};

export default function StatusBar({ status, ip, lastUpdated }: StatusBarProps) {

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={[styles.dot, status ? styles.green : styles.red]} />
        <View>
          <CustomText m bold>
            {status ? "All systems operational" : "System is down :( "}
          </CustomText>
          <CustomText s muted mono>
            {status && ip ? ip : "0.0.0.0"}
          </CustomText>
        </View>
      </View>
      <View style={styles.right}>
        <CustomText s muted mono>
          UPDATED
        </CustomText>
        <CustomText s>
          <LastUpdated lastUpdated={lastUpdated} />
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.borderRadius,
    padding: sizes.padding,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.cardBackground,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    boxShadow: "0 0 0 5px rgba(82, 224, 180, 0.09), 0 0 14px #52e0b4",
  },
  green: {
    backgroundColor: colors.mint,
  },
  red: {
    backgroundColor: colors.red,
  },
  left: {
    flex: 2,
    gap: sizes.gapMedium,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});
