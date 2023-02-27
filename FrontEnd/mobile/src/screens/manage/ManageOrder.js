import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import COLOR from '../../res/color';
import stylesTour from '../tourScreen/styles';

function ManageOrder({ navigation }) {
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -150,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={stylesAllTour.title}>Quản lý đơn đặt</Text>
            </View>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('ManageOrderFollowStatus')}>
                    <View style={stylesManage.btn}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="information-circle-outline" size={20} color={COLOR.primary} />
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                Quản lý theo trạng thái
                            </Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ManageOrderFollowTour')}>
                    <View style={stylesManage.btn}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="information-circle-outline" size={20} color={COLOR.primary} />
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                Quản lý theo tour
                            </Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Changepassword')}>
                    <View style={stylesManage.btn}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="information-circle-outline" size={20} color={COLOR.primary} />
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                Quản lý theo khách hàng
                            </Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.primary} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ManageOrder;
