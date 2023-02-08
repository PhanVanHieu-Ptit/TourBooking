import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../../screens/home';
import Login from '../../../screens/auth/Login';
import Register from '../../../screens/auth/register';
import COLOR from '../../../res/color';
import ManageInforPersonScreen from '../../../screens/manage/manageInforPersonScreen';
import ManageScreen from '../../../screens/manage/ManageScreen';
import HistoryOrderScreen from '../../../screens/historyOrder.js/HistoryOrder';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: COLOR.primary,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="HistoryOrder"
                component={HistoryOrderScreen}
                options={{
                    tabBarLabel: 'Lịch sử',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cart" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Account"
                component={ManageScreen}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
