import MyTabs from './src/components/general/navBar';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/navigation/home';
import DetailHistoryOrder from './src/screens/historyOrder.js/DetailHistoryOrder';
import Register from './src/screens/auth/register';

export default function App() {
    return (
        <NavigationContainer>
            {/* <MyTabs /> */}
            <HomeNavigation />
        </NavigationContainer>
    );
}
