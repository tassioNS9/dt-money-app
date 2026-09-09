import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { useCallback } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { SystemBars } from "react-native-edge-to-edge";
import { useAuthContext } from "@/Context/auth.context";

const NavigationRoutes = () => {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (user && token) {
      return <PrivateRoutes />;
    } else {
      return <PublicRoutes />;
    }
  }, [user, token]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
