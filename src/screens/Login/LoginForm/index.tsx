import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "@/Context/auth.context";
import { AxiosError } from "axios";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { handleAuthenticate } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async ({ email, password }: FormLoginParams) => {
    try {
      await handleAuthenticate({ email, password });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error during login:", error.response?.data);
      }
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="email"
        lable="EMAIL"
        placeholder="mail@example.com"
        leftIconName="mail-outline"
      />
      <AppInput
        control={control}
        name="password"
        lable="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          iconName="arrow-forward"
          mode="fill"
        >
          Login
        </AppButton>

        <View>
          <Text className="mb-5 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate("Register")}
            iconName="arrow-forward"
            mode="outline"
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
