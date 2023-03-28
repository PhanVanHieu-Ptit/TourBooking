import React,{ useState,useEffect,} from 'react';
import { SafeAreaView,Image,View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesAllTour from '../allTour/style';
import COLOR from '../../res/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../../components/HistoryOrder.js/Line';
import stylesTour from '../tourScreen/styles';


function BillOrder() {
    const windowWidth=Dimensions.get('window').width;

    return (
        <SafeAreaView >
            <View
                style={{
                    justifyContent: 'center',alignItems: 'center'
                }}
            >
                <Text style={[stylesAllTour.title,{ marginLeft: 0,marginTop: 20 }]}>Hóa đơn</Text>
            </View>
            <View style={style.banner}>
                <View style={{}}>
                    <Text
                        style={style.bold}>
                        Hoàn thành!
                    </Text>
                    <Text
                        style={style.regular}>
                        Cảm ơn bạn vì đã lựa chọn chúng tôi
                    </Text>
                </View>
                <View style={style.icon}>
                    <MaterialIcons name="assignment" size={50} color="#FFFF" style={{ marginLeft: 10 }} />
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'center',alignItems: 'center'
                }}
            >
                <Text style={[stylesAllTour.title,{ marginLeft: 0,marginTop: 10 }]}>Thông tin chuyến đi</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Line title='Họ tên:' value='Thùy Trang' />
                <Line title='Số điện thoại:' value='0967126732' />
                <Line title='Email:' value='nguyenvana@gmail' />
                <Line title='Tên tour:' value='Du lịch miền Tây' />
                <Line title='Ngày khởi hành:' value='28/03/2023' />
                <Line title='Ngày kết thúc:' value='01/04/2023' />
                <Line title='Giá vé:' value='500.000đ' />
                <Line title='Số lượng:' value='2' />
                <View style={{ height: 160,width: windowWidth }}>
                    <Text
                        style={[style.bold,{ color: COLOR.primary,marginTop: 10,marginLeft: 20 }]}>
                        Ảnh minh họa:
                    </Text>
                    <View style={{ alignItems: 'center',marginTop: 10 }}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/474x/4d/35/d1/4d35d1817aedd534a81a85cb77d9b25f.jpg' }}
                            style={{ resizeMode: 'stretch',height: 117,width: 194 }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row',alignItems: 'center' }}>
                    <Text style={[style.bold,style.addBold]}>Thành tiền:</Text>
                    <Text style={[style.regular,style.addRegular]}>1.000.000đ</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center',marginTop: 10 }}>
                <TouchableOpacity>
                    <View style={[stylesTour.btn,{ width: 150 }]}>
                        <Text style={stylesTour.txt_btn}>Thoát</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default BillOrder;

const style=StyleSheet.create({
    banner: {
        marginTop: 10,
        height: 80,
        backgroundColor: COLOR.primary,
        flexDirection: 'row'
    },

    bold: {
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
        marginTop: 15
    },
    regular: {
        fontFamily: 'Ubuntu',
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },
    addBold: {
        color: COLOR.primary,
        fontSize: 20,
        marginLeft: 20
    },
    addRegular: {
        color: COLOR.primary,
        fontSize: 20,
        marginLeft: 15,
        marginTop: 15
    }
});