import * as React from 'react';
import MyTabs from './src/components/general/navBar';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/navigation/home';
import DetailHistoryOrder from './src/screens/historyOrder.js/DetailHistoryOrder';

export default function App() {
    return (
        <NavigationContainer>
            {/* <MyTabs /> */}
            <HomeNavigation />
        </NavigationContainer>
    );
}
