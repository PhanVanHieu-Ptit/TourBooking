import React,{ useState,useEffect,} from 'react';
import { View,Text,StyleSheet } from 'react-native';


function Line({ title,value }) {
    return (
        <View style={{ flexDirection: 'row',alignItems: 'center' }}>
            <Text style={style.bold}>{title}</Text>
            <Text style={style.regular}>{value}</Text>
        </View>
    );
}
export default Line;
const style=StyleSheet.create({
    bold: {
        fontFamily: 'Ubuntu',
        color: '#021A5A',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10
    },
    regular: {
        fontFamily: 'Ubuntu',
        color: '#021A5A',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 10,
    },
});