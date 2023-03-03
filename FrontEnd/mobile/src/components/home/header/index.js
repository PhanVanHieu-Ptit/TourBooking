import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesHeader from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../../../../App';

function Header() {
    const { user, setUser } = useContext(AppContext);
    // const [user, setUser] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((value) => {
                setUser(JSON.parse(value));
                console.log('Retrieved user: ', user);
            })
            .catch((error) => console.log('Error retrieving object: ', error));
    }, []);
    // const user = {
    //     id: 1,
    //     name: 'Phan Văn Hiểu',
    //     uriImage: 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',
    // };
    return (
        <View style={stylesHeader.header}>
            <Icon name="notifications" size={25} color="#021A5A" />
            <View style={stylesHeader.view_info}>
                <View style={stylesHeader.view_txt}>
                    <Text style={stylesHeader.title1}>Chào {user?.name != undefined ? user.name : 'Bạn'},</Text>
                    <Text style={stylesHeader.title2}>Chúc bạn có chuyến đi vui vẻ!</Text>
                </View>
                <Image
                    source={{
                        uri:
                            user?.imageUrl != undefined
                                ? user.imageUrl
                                : `https://freesvg.org/img/abstract-user-flat-4.png`,
                    }}
                    style={stylesHeader.img}
                />
            </View>
        </View>
    );
}

export default Header;
