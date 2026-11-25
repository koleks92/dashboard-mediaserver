import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "./constants/colors";
import { Icon } from "./components/icons/icons";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import {
  DMMono_400Regular,
  DMMono_500Medium,
} from "@expo-google-fonts/dm-mono";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { sizes } from "./constants/sizes";
import DashboardProvider from "./context/DashboardContext";

SplashScreen.preventAutoHideAsync(); // outside the component, at the top level

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <DashboardProvider>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: colors.mint,
          tabBarInactiveTintColor: colors.mutedText,
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: { fontSize: 13, fontWeight: "600" },

          // The floating bar
          tabBarStyle: {
            position: "absolute",
            marginHorizontal: 24,
            bottom: Math.max(insets.bottom, 16),
            height: 64,
            borderRadius: sizes.borderRadius,
            backgroundColor: colors.cardBackground,
            borderWidth: 1,
            borderColor: colors.border,
            paddingTop: 0,
            paddingBottom: 0,
            elevation: 0,
          },

          tabBarItemStyle: {
            margin: 8,
            borderRadius: 24,
          },

          // Pill behind the active tab: fill and radius on the same view
          tabBarButton: (props) => {
            const selected =
              props["aria-selected"] ?? props.accessibilityState?.selected;

            return (
              <Pressable
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                accessibilityLabel={props.accessibilityLabel}
                testID={props.testID}
                style={[
                  props.style,
                  selected && {
                    backgroundColor: colors.activeCard,
                    borderRadius: 12,
                  },
                ]}
              >
                {props.children}
              </Pressable>
            );
          },
        }}
      >
        <Tabs.Screen
          name="overview"
          options={{
            title: "Overview",
            tabBarIcon: ({ color, size }) => (
              <Icon name="info" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="performance"
          options={{
            title: "Performance",
            tabBarIcon: ({ color, size }) => (
              <Icon name="activity" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </DashboardProvider>
  );
}
