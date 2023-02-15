import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import Register from '../../screens/auth/register';
import Login from '../../screens/auth/Login';
import ForgotPassword from '../../screens/auth/forgotPassword';
import MyTabs from '../../components/general/navBar';
import AllTourScreen from '../../screens/allTour';
import DetailTourScreen from '../../screens/detailTour/DetailTourScreen';
import ManageInforPersonScreen from '../../screens/manage/manageInforPersonScreen';
import ManageStaffScreen from '../../screens/manage/ManageStaffScreen';
import EditInforStaffScreen from '../../screens/manage/EditInforStaffScreen';
import ManageOrder from '../../screens/manage/ManageOrder';
import ManageTourScreen from '../../screens/manageTour/manageTourScreen';
import TourScreen from '../../screens/tourScreen/TourScreen';
import DetailHistoryOrder from '../../screens/historyOrder.js/DetailHistoryOrder';
import ChangePassword from '../../screens/manage/ChangePassword';

const Stack = createStackNavigator();
function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={MyTabs} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Forgotpassword" component={ForgotPassword} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AllTour" component={AllTourScreen} />
            <Stack.Screen name="DetailTour" component={DetailTourScreen} />
            <Stack.Screen name="Profile" component={ManageInforPersonScreen} />
            <Stack.Screen name="ManageStaff" component={ManageStaffScreen} />
            <Stack.Screen name="EditStaff" component={EditInforStaffScreen} />
            <Stack.Screen name="ManageOrder" component={ManageOrder} />
            <Stack.Screen name="ManageTour" component={ManageTourScreen} />
            <Stack.Screen name="EditTour" component={TourScreen} />
            <Stack.Screen name="DetailHistoryOrder" component={DetailHistoryOrder} />
            <Stack.Screen name="Changepassword" component={ChangePassword} />
        </Stack.Navigator>
    );
}

export default HomeNavigation;
