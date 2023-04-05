import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from '../home/card/style';

function CardStaff(route) {
    const staff = route.staff;
    return (
        <TouchableOpacity onPress={() => route.navigation.navigate('EditStaff', { staff: staff, type: 'edit' })}>
            <Text>#{staff.idStaff}</Text>
            <View style={[stylesCard.card2, { justifyContent: 'flex-start' }]}>
                <Image
                    source={{ uri: `${staff.imageUrl}` }}
                    style={[stylesCard.img2, { borderRadius: 50, borderColor: '#ffffff', borderWidth: 2 }]}
                />

                <View>
                    <Text style={[stylesCard.txt3, { fontSize: 16, margin: 3 }]}>Họ tên: {staff.name}</Text>
                    <Text style={[stylesCard.txt3, { fontSize: 16, margin: 3 }]}>Email: {staff.email}</Text>
                    <Text style={[stylesCard.txt3, { fontSize: 16, margin: 3 }]}>Trạng thái: {staff.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardStaff;
