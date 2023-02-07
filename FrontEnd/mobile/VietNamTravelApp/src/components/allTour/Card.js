import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stylesCard from '../home/card/style';
import stylesAllTour from './styles';

function MyTourCard({ navigation, props }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailTour', { tour: props });
            }}
        >
            <View style={stylesAllTour.card}>
                <Image source={{ uri: `${props.imageUrl}` }} style={stylesCard.img}></Image>
                <Text style={stylesAllTour.title}>{props.name}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                    <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                    <Text> 5.0</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <MaterialIcons name="place" size={15} />
                    <Text>{props.tourDestination}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default MyTourCard;
