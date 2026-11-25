import { StyleSheet, View } from "react-native"
import CustomText from "./CustomText"
import { sizes } from "@/app/constants/sizes"

type TitleBarProps = {
    title: string,
    titleBig: string,
}

export default function TitleBar({title, titleBig}: TitleBarProps) {
    return (
        <View style={styles.root}>
            <CustomText s muted mono bold>{title}</CustomText>
            <CustomText xxl bold>{titleBig}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
    }
})