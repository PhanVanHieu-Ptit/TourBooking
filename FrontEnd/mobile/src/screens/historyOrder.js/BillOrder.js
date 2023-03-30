import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesAllTour from '../allTour/style';
import COLOR from '../../res/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Line from '../../components/HistoryOrder.js/Line';
import stylesTour from '../tourScreen/styles';
import { formatDate, formatMoney } from '../../res/untils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import QRCode from 'react-native-qrcode-svg';

function BillOrder({ route, navigation }) {
    const windowWidth = Dimensions.get('window').width;
    console.log('route: ', route);
    const tourOrder = route.params.tourOrder;
    const customer = tourOrder.customer;
    const tour = tourOrder.tour;

    async function printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Tour Booking</title>
                    <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                    <style>
                        .invoice-box {
                            /* max-width: 400px; */
                            margin: auto;
                            padding: 30px;
                            border: 1px solid #eee;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                            font-size: 16px;
                            line-height: 24px;
                            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                            color: #555;
                        }
            
                        .text-title {
                            text-align: center;
                            font-size: 18;
                            font-weight: bold;
                            color: #021a5a;
                        }
            
                        .box-banner {
                            margin-top: 10px;
                            height: 80px;
                            background-color: #021a5a;
                        }
            
                        .bold {
                            position: absolute;
                            font-size: 16;
                            font-weight: bold;
                            color: #fff;
                            margin-left: 20px;
                            margin-top: 15px;
                        }
            
                        .regular {
                            position: absolute;
                            color: #fff;
                            font-size: 16;
                            margin-left: 20px;
                            margin-top: 40px;
                        }
            
                        .line {
                            margin-top: 10px;
                        }
            
                        .add-bold {
                            float: left;
                            width: fit-content;
                            margin-right: 20px;
                            color: #021a5a;
                            font-size: 16;
                            font-weight: bold;
                            margin-left: 20px;
                        }
            
                        .add-regular {
                            color: #021a5a;
                            font-size: 16;
                        }
                    </style>
                </head>
            
                <body>
                    <div class="invoice-box">
                        <div class="text-title">
                            <div>Hóa đơn</div>
                        </div>
                        <div class="box-banner">
                            <div>
                                <div class="bold">Hoàn thành</div>
                                <div class="regular">Cảm ơn bạn vì đã lựa chọn chúng tôi</div>
                            </div>
                            <i class="fa-solid fa-clipboard-list" style="color: #f0f5ff"></i>
                        </div>
                        <div class="text-title" style="margin-bottom: 15px; margin-top: 5px">Thông tin chuyến đi</div>
                        <div class="line">
                            <div class="add-bold">Họ tên:</div>
                            <div class="add-regular">${customer.name}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Số điện thoại:</div>
                            <div class="add-regular">${customer.phoneNumber}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Email:</div>
                            <div class="add-regular">${customer.email}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Tên Tour:</div>
                            <div class="add-regular">${tour.name}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Ngày khởi hành:</div>
                            <div class="add-regular">${formatDate(tour.startDate)}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Ngày kết thúc:</div>
                            <div class="add-regular">${formatDate(
                                new Date(tour.startDate).setDate(new Date(tour.startDate).getDate() + tour.totalDay),
                            )}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Giá vé:</div>
                            <div class="add-regular">${formatMoney(tour.price)}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Số lượng:</div>
                            <div class="add-regular">${tourOrder.quantity}</div>
                        </div>
                        <div class="line">
                            <div class="add-bold">Ảnh minh họa:</div>
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?data=${
                                    tourOrder.idTourOrder + '_' + customer.idCustomer + '_' + tour.idTour
                                }&amp;size=100x100"
                                width="100"
                                height="100"
                            />
                        </div>
                        <div class="line">
                            <div class="add-bold" style="font-size: 20px">Thành tiền:</div>
                            <div class="add-regular" style="font-size: 20px">${formatMoney(tourOrder.totalMoney)}</div>
                        </div>
                    </div>
                </body>
            </html>   
            `,
            fileName: 'test',
            base64: true,
        });

        await RNPrint.print({ filePath: results.filePath });
    }

    function getDataURL() {
        svg.toDataURL(callback);
    }

    function callback(dataURL) {
        console.log(dataURL);
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={[stylesAllTour.title, { marginLeft: 0, marginTop: 20 }]}>Hóa đơn</Text>
            </View>
            <View style={style.banner}>
                <View style={{}}>
                    <Text style={style.bold}>Đã thanh toán!</Text>
                    <Text style={style.regular}>Cảm ơn bạn vì đã lựa chọn chúng tôi</Text>
                </View>

                <TouchableOpacity onPress={async () => await printPDF()}>
                    <AntDesign name="printer" size={50} color="#FFFF" style={{ marginTop: 10 }} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={[stylesAllTour.title, { marginLeft: 0, marginTop: 10 }]}>Thông tin chuyến đi</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Line title="Họ tên:" value={customer.name} />
                <Line title="Số điện thoại:" value={customer.phoneNumber} />
                <Line title="Email:" value={customer.email} />
                <Line title="Tên tour:" value={tour.name} />
                <Line title="Ngày khởi hành:" value={formatDate(tour.startDate)} />
                <Line
                    title="Ngày kết thúc:"
                    value={formatDate(
                        new Date(tour.startDate).setDate(new Date(tour.startDate).getDate() + tour.totalDay),
                    )}
                />
                <Line title="Giá vé:" value={formatMoney(tour.price)} />
                <Line title="Số lượng:" value={tourOrder.quantity} />
                <View style={{ height: 160, width: windowWidth }}>
                    <Text style={[style.bold, { color: COLOR.primary, marginTop: 10, marginLeft: 20 }]}>
                        Ảnh minh họa:
                    </Text>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        {/* <Image
                            source={{ uri: 'https://i.pinimg.com/474x/4d/35/d1/4d35d1817aedd534a81a85cb77d9b25f.jpg' }}
                            style={{ resizeMode: 'stretch', height: 117, width: 194 }}
                        /> */}
                        <QRCode value={tourOrder.idTourOrder + '_' + customer.idCustomer + '_' + tour.idTour} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[style.bold, style.addBold]}>Thành tiền:</Text>
                    <Text style={[style.regular, style.addRegular]}>{formatMoney(tourOrder.totalMoney)}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <View style={[stylesTour.btn, { width: 150 }]}>
                        <Text style={stylesTour.txt_btn}>Thoát</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default BillOrder;

const style = StyleSheet.create({
    banner: {
        marginTop: 10,
        height: 80,
        backgroundColor: COLOR.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bold: {
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
        marginTop: 15,
    },
    regular: {
        fontFamily: 'Ubuntu',
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },

    addBold: {
        color: COLOR.primary,
        fontSize: 20,
        marginLeft: 20,
    },
    addRegular: {
        color: COLOR.primary,
        fontSize: 20,
        marginLeft: 15,
        marginTop: 15,
    },
});
