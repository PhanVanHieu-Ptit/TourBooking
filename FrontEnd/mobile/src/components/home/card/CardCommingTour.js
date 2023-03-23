import React from 'react';
import { Image,ImageBackground,Text,TouchableOpacity,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from './style';
import { formatDate,formatMoney } from '../../../res/untils';

function CardCommingTour(props) {
    const tour=props.tour;
    // const imageUrl = tour.image_list.split(',')[0];

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate(props.screen,{ tour: tour,type: 'edit' });
            }}
        >
            <View style={[stylesCard.card2,{ elevation: 10 }]}>
                <Image source={{ uri: `${tour.imageUrl[0]}` }} style={stylesCard.img2} />

                <View>
                    <View style={{ flexDirection: 'row',margin: 5 }}>
                        <Text style={stylesCard.txt3} numberOfLines={2}>
                            {tour.name}
                        </Text>
                        <View style={stylesCard.viewStar}>
                            <Text style={{ color: '#FFFF' }}>5</Text>
                            <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row',margin: 5 }}>
                        <AntDesign name="calendar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt1}>
                            {formatDate(tour.startDate)} -- {tour.totalDay} ngày
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row',margin: 5 }}>
                        <FontAwesome name="dollar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt1}>{formatMoney(tour.price)}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="place" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                            <Text style={stylesCard.txt1}>{tour.tourDestination}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CardCommingTour;
