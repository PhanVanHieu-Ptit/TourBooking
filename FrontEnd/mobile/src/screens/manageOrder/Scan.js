import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as request from '../../services/untils';
import API from '../../res/string';
import { formatDateWithHour } from '../../res/untils';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            user: props.route.params.user,
            navigation: props.navigation,
            time: '',
        };
    }
    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true,
        });
        if (check === 'http') {
            Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true,
                time: formatDateWithHour(new Date()),
            });
            const list = e.data.split('_');
            if (list[0] != '' && list[1] != '' && list[2] != '')
                this.updateStatusOrder(list[0], list[1], list[2], '/confirm-using');
        }
    };
    activeQR = () => {
        this.setState({ scan: true });
    };
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false });
    };

    updateStatusOrder(idTourOrder, idCustomer, idTour, comand) {
        request
            .postPrivate(
                API.tourOrder + idTourOrder + comand,
                { id: idTourOrder, idCustomer, idTour },
                { 'Content-Type': 'application/json', authorization: this.state.user.accessToken },
                'PATCH',
            )
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    // updateListOrder();
                    Alert.alert('Thông báo!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { scan, ScanResult, result, navigation, time } = this.state;

        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back" size={36} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Quét QR Code</Text>
                    </View>
                    {!scan && !ScanResult && (
                        <View style={styles.cardView}>
                            <AntDesign name="camera" size={36} color="#021A5A" />
                            <Text numberOfLines={8} style={styles.descText}>
                                Vui lòng đưa camera của bạn {'\n'} lên QR Code
                            </Text>
                            <MaterialCommunityIcons name="qrcode-scan" size={200} color="#021A5A" />
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                    <AntDesign name="camera" size={36} color="#021A5A" />
                                    <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Quét QR Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    {ScanResult && (
                        <Fragment>
                            <Text style={styles.textTitle1}>Kết quả</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Loại : {result.type}</Text>
                                <Text>Kết quả : {result.data}</Text>
                                <Text numberOfLines={1}>Dữ liệu: {result.rawData}</Text>
                                <Text>Thời gian : {time}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <AntDesign name="camera" size={36} color="#021A5A" />
                                        <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>
                                            Bấm để quét lại
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    )}
                    {scan && (
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => {
                                this.scanner = node;
                            }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>Vui lòng đưa camera của bạn {'\n'} lên QR Code</Text>
                            }
                            bottomContent={
                                <View>
                                    <ImageBackground
                                        source={{
                                            uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/F1_light_blue_flag.svg/2560px-F1_light_blue_flag.svg.png`,
                                        }}
                                        style={styles.bottomContent}
                                    >
                                        <TouchableOpacity
                                            style={styles.buttonScan2}
                                            onPress={() => this.scanner.reactivate()}
                                            onLongPress={() => this.setState({ scan: false })}
                                        >
                                            <Entypo
                                                name="camera"
                                                size={50}
                                                color="#021A5A"
                                                marginLeft={23}
                                                marginTop={22}
                                            />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            }
                        />
                    )}
                </Fragment>
            </View>
        );
    }
}
export default Scan;
