import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/navigation/home';
import React, { createContext, useState, useEffect } from 'react';
import AuthByFinger from './src/screens/auth/Login/authByFinger';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [toursOutStanding, setToursOutStanding] = useState([]);
    const [toursComing, setToursComming] = useState([]);
    const [historyOrder, setHistoryOrder] = useState([]);
    const [listTour, setListTour] = useState([]);
    const [listOrder, setListOrder] = useState([]);
    const [listStaff, setListStaff] = useState([]);
    const [listAllTour, setListAllTour] = useState([]);

    const contextValues = {
        user,
        setUser,
        toursOutStanding,
        setToursOutStanding,
        toursComing,
        setToursComming,
        historyOrder,
        setHistoryOrder,
        listTour,
        setListTour,
        listOrder,
        setListOrder,
        listStaff,
        setListStaff,
    };

    return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};
export { AppContext, AppContextProvider };

export default function App() {
    return (
        <AppContextProvider>
            <NavigationContainer>
                {/* <MyTabs /> */}
                <HomeNavigation />
            </NavigationContainer>
        </AppContextProvider>
    );
}
