import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput control={control} name="email" placeholder="mail@example.com" />
      <AppInput
        control={control}
        name="password"
        placeholder="••••••••"
        secureTextEntry
      />
    </>
  );
};
