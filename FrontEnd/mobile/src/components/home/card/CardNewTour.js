import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stylesCard from './style';

function CardNewTour({ navigation, props }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailTour', { tour: props });
            }}
        >
            <ImageBackground source={{ uri: `${props.imageUrl[0]}` }} style={stylesCard.img}>
                <View style={[stylesCard.viewStar, { marginLeft: 90 }]}>
                    <Text style={{ color: '#FFFF' }}>5</Text>
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                </View>
                <View style={{ marginTop: 90 }}>
                    <Text style={stylesCard.txt1}>{props.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="place" size={15} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt2}>{props.tourDestination}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default CardNewTour;
