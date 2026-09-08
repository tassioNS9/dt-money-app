import "@/styles/global.css";
import NavigationRoutes from "@/routes";
import { AuthContextProvider } from "@/Context/auth.context";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
