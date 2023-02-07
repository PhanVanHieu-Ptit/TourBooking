import React from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import {SelectList} from 'react-native-dropdown-select-list';
import CardOrder from '../../components/mange/CardOrder';

function ManageOrder() {
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];
  const DATA = [
    {
      id: 1,
      orderDate: '20/01/2023',
      name: 'Biển Ngọc',
      tourDestination: 'Phú Quốc',
      startDate: '25/01/2023',
      totalDay: '2',
      price: '1500',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
      user: {
        name: 'Phan Văn Hiểu',
        phone: '0123454123',
        email: 'phanvanhieu@gmail.com',
      },
      number: 2,
      note: '',
    },
    {
      id: 2,
      orderDate: '20/01/2023',
      name: 'Biển Ngọc',
      tourDestination: 'Phú Quốc',
      startDate: '25/01/2023',
      totalDay: '2',
      price: '1500',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
      user: {
        name: 'Phan Văn Hiểu',
        phone: '0123454123',
        email: 'phanvanhieu@gmail.com',
      },
      number: 3,
      note: '',
    },
    {
      id: 3,
      orderDate: '20/01/2023',
      name: 'Biển Ngọc',
      tourDestination: 'Phú Quốc',
      startDate: '25/01/2023',
      totalDay: '2',
      price: '1500',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
      user: {
        name: 'Phan Văn Hiểu',
        phone: '0123454123',
        email: 'phanvanhieu@gmail.com',
      },
      number: 5,
      note: '',
    },
  ];
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: -150,
        }}>
        <TouchableOpacity>
          <View style={stylesButton.btn_back}>
            <Icon name="chevron-back" size={25} color="#021A5A" />
          </View>
        </TouchableOpacity>
        <Text style={stylesAllTour.title}>Quản lý đơn đặt</Text>
      </View>
      <View style={{marginLeft: 200}}>
        <SelectList
          setSelected={val => setSelected(val)}
          data={data}
          save="value"
        />
      </View>

      <ScrollView>
        {DATA.map(item => (
          <CardOrder props={item} key={item.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ManageOrder;
