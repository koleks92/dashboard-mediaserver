import { StyleSheet, View, Pressable } from "react-native";
import CustomText from "./CustomText";
import { Icon } from "../icons/icons";
import { rfs } from "../../../../util/responsiveFontSizing";
import { colors } from "@/app/constants/colors";

type TopProps = {
  hostname: string;
  onRefresh: () => void;
};

export default function Top({ hostname, onRefresh }: TopProps) {
  return (
    <View style={styles.root}>
      <View style={styles.logoView}>
        <Icon name="server" size={rfs(24)} color={colors.cardBackground} />
      </View>
      <View style={styles.titleView}>
        <CustomText s muted bold>MEDIA SERVER</CustomText>
        <CustomText bold xxl>{hostname}</CustomText>
      </View>
      <Pressable style={styles.refreshView} onPress={onRefresh}>
        <Icon name="refresh" size={rfs(24)} color={colors.mutedText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 16,
  },
  logoView: {
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mint,
    borderRadius: rfs(10),
  },
  titleView: {
    flex: 1,
    flexDirection: "column",
  },
  refreshView: {
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: rfs(10),
  },
});
