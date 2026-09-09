import { DismissKeyboardView } from "@/components/DismissKeyboard";
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { useAuthContext } from "@/context/auth.context";

export const Login = () => {
  const { user, token } = useAuthContext();
  console.log("user", user);
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};
