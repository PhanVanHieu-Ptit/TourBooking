import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../untils';
import API from '../../res/string';
import { AppContext } from '../../../App';
import { useContext } from 'react';

export default async function getRefreshToken() {
    const { user, setUser } = useContext(AppContext);

    try {
        const res2 = await request(options).post(API.refeshToken, { token: user.refreshToken });
        console.log('res2: ', res2);
        if (res2.data.status == true) {
            const newUser = {
                id: user.id,
                name: user.name,
                imageUrl: user.imageUrl,
                role: user.role,
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: user.address,
                accessToken: res2.data.data[0].token,
                refreshToken: user.refreshToken,
            };
            //update user in side client
            setUser(newUser);

            //delete old user
            AsyncStorage.removeItem('user')
                .then(() => {
                    console.log('user removed from AsyncStorage');
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log('user: ', newUser);
            AsyncStorage.setItem('user', JSON.stringify(newUser))
                .then(() => console.log('Object stored successfully'))
                .catch((error) => console.log('Error storing object: ', error));
            return true;
        } else {
            // Alert.alert('Thông báo!', res2.message + '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            console.log('res2.message: ', res2.message);
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}
