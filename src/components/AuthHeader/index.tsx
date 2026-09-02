import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const keyboardVisible = useKeyboardVisible();

  if (keyboardVisible) {
    return null;
  }
  return (
    <View className="w-full min-h-40 items-center justify-center">
      <Image
        source={require("@/assets/Logo.png")}
        className="w-[255px] h-[48px]"
        resizeMode="contain"
      />
    </View>
  );
};
