import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ManageOrderFollowStatus from '../screens/manageOrder/ManageOrderFollowStatus';
import CustomerFollowTour from '../screens/manageOrder/CustomerFollowTour';

const Tab = createMaterialTopTabNavigator();

function TopTabOrderNavigation({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen name="Danh sách đơn đặt" component={ManageOrderFollowStatus} />
            <Tab.Screen name="Danh sách khách hàng" component={CustomerFollowTour} />
        </Tab.Navigator>
    );
}

export default TopTabOrderNavigation;
