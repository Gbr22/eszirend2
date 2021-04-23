import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";

export let TouchableFallback = Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
})