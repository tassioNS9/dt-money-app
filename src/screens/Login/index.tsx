import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "@/routes/PublicRoutes";

export const Login = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-blue-800 text-3xl">Tela de login!</Text>
      <TouchableOpacity
        className="bg-blue-800 px-4 py-2 rounded-md mt-4"
        onPress={() => navigation.navigate("Register")}
      >
        <Text className="text-white text-lg">Ir para Registro</Text>
      </TouchableOpacity>
    </View>
  );
};
