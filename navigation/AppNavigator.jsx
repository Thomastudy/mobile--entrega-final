// CONSTANTES
import SCREENS from "../screens/screens";

import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//     </Stack.Navigator>
//   );
// }

// const TabStacks = () => {
//   return (
//     <Tab.Navigator>

//     </Tab.Navigator>
//   );
// };

function AppStack() {
  return (
   
  );
}

export default function AppNavigator() {
  const isLoading = useSelector((state) => state.ui.loading);

  return (
    <NavigationContainer>
      {isLoading ? <SplashScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}
