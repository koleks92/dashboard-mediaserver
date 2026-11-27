import { StyleSheet, View, Text } from "react-native";
import CardMain from "../cards/CardMain";
import { Icon } from "../icons/icons";
import { rfs } from "../../../../util/responsiveFontSizing";
import { colors } from "@/app/constants/colors";
import RingGauge from "../extra/RingGauge";
import CustomText from "../UI/CustomText";
import { sizes } from "@/app/constants/sizes";
import { useDashboard } from "@/app/context/DashboardContext";

type SquareCardsProps = {
  type: "cpu" | "mem";
};

export default function SquareCards({ type }: SquareCardsProps) {
  const { systemStatus } = useDashboard();

  const GB = 1024 ** 3;

  let value = 0; // percent, 0 to 100
  let memUsedGb = 0;
  let memTotalGb = 0;

  if (systemStatus) {
    if (type === "cpu") {
      value = systemStatus.cpuLoad;
    } else {
      memUsedGb = systemStatus.memUsed / GB;
      memTotalGb = systemStatus.memTotal / GB;
      value = Math.round((systemStatus.memUsed / systemStatus.memTotal) * 100);
    }
  }

  const iconName = type === "cpu" ? "cpu" : "database";
  const iconColor = type === "cpu" ? colors.mint : colors.violet;
  const title = type === "cpu" ? "CPU LOAD" : "MEMORY USED";

  return (
    <CardMain>
      <View style={styles.top}>
        {/* ICON */}
        <View style={styles.iconView}>
          <Icon name={iconName} size={rfs(24)} color={iconColor} />
        </View>
        {/* PERCENTAGE GRAPH */}
        <View>
          <RingGauge value={value / 100} size={rfs(48)} color={iconColor}>
            <CustomText s bold>
              {value} %
            </CustomText>
          </RingGauge>
        </View>
      </View>
      <View style={styles.bottom}>
        <CustomText mono muted bold s>
          {title}
        </CustomText>
        {type === "cpu" ? (
          <View style={styles.valuesView}>
            <View style={styles.valuesRowView}>
              <CustomText xxl bold mono>
                {value}
              </CustomText>
              <CustomText m muted mono>
                {" "}
                %
              </CustomText>
            </View>
            <CustomText s muted>
              {systemStatus?.cpuSpeed} GHz x {systemStatus?.cpuCores} cores
            </CustomText>
          </View>
        ) : (
          <View style={styles.valuesView}>
            <View style={styles.valuesRowView}>
              <CustomText xxl bold mono>
                {memUsedGb.toFixed(1)}
              </CustomText>
              <CustomText m muted mono>
                {" "}
                GB
              </CustomText>
            </View>
            <CustomText s muted>
              of {memTotalGb.toFixed(1)} GB available
            </CustomText>
          </View>
        )}
      </View>
    </CardMain>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  iconView: {
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.activeCard,
    borderRadius: rfs(12),
  },
  bottom: {
    gap: sizes.gapSmall,
  },
  valuesView: {},
  valuesRowView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
