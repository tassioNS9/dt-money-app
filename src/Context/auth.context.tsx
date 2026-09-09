import { FormLoginParams } from "@/screens/Login/LoginForm";
import { FormRegisterParams } from "@/screens/Register/RegisterForm";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import * as authService from "@/shared/services/dt-money/auth.service";
import { IUser } from "@/shared/interfaces/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async ({ email, password }: FormLoginParams) => {
    const response = await authService.authenticate({ email, password });
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user: response.user, token: response.token }),
    );
    setUser(response.user);
    setToken(response.token);
  };

  const handleRegister = async ({
    email,
    name,
    password,
    confirmPassword,
  }: FormRegisterParams): Promise<void> => {
    const response = await authService.register({
      email,
      name,
      password,
      confirmPassword,
    });
    setUser(response.user);
    setToken(response.token);
  };
  const handleLogout = () => {};

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { user, token } = JSON.parse(userData);
      setUser(user);
      setToken(token);
    }
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
