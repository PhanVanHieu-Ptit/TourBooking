import React from 'react';
import { Text,View,StyleSheet,ImageBackground,StatusBar } from 'react-native';
import COLOR from '../../res/color';

function Splash() {
    return <ImageBackground source={require('./load.jpg')} style={Style.img}>
        <View style={Style.view}>
            <Text style={[Style.txtLarge]}>WELCOME TO</Text>
            <Text style={Style.txtLarge}>TOURBOOKING</Text>
            <Text style={[Style.txtSmall,{ marginTop: 10 }]}>Đi muôn nơi</Text>
            <Text style={Style.txtSmall}>Đồng hành cùng chúng tôi</Text>
        </View>
    </ImageBackground>

}

const Style=StyleSheet.create({
    img: {
        flex: 1,
        resizeMode: "cover",
        textAlign: '',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    view: {
        marginTop: 400,
        marginLeft: 20
    },

    txtLarge: {
        fontSize: 40,
        fontFamily: "Ubuntu",
        color: '#ffffff',
        fontWeight: '700'
    },

    txtSmall: {
        fontSize: 18,
        fontFamily: "Ubuntu",
        color: '#ffffff',
        fontWeight: '500'
    }
});

export default Splash;