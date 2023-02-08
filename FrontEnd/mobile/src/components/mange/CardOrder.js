import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from '../home/card/style';
import {useLinkProps} from '@react-navigation/native';
import COLOR from '../../res/color';

const ExpandableView = ({expanded = false, props}) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 150 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  // console.log('rerendered');

  return (
    <Animated.View style={{height}}>
      <Text style={styles.title}>Thông tin đơn đặt</Text>
      <Text style={styles.content}>Họ tên: {props?.user?.name}</Text>
      <Text style={styles.content}>Số điện thoại: {props?.user?.phone}</Text>
      <Text style={styles.content}>Email: {props?.user?.email}</Text>
      <Text style={styles.content}>Số lượng: {props?.number}</Text>
      <Text style={styles.content}>
        Tổng tiền: {props?.number * props?.price}
      </Text>
      <Text style={styles.content}>Ghi chú: {props?.note}</Text>
      <View style={{borderBottomWidth: 2}} />
    </Animated.View>
  );
};

function CardOrder({props}) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <View>
      <Text style={styles.title}>Ngày {props.orderDate}</Text>
      <TouchableOpacity>
        <View style={[stylesCard.card2, {height: 140}]}>
          <Image source={{uri: `${props.imageUrl}`}} style={stylesCard.img2} />

          <View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <Text style={stylesCard.txt3}>{props.name}</Text>
              <View style={stylesCard.viewStar}>
                <Text style={{color: '#FFFF'}}>5</Text>
                <Icon
                  name="star"
                  size={15}
                  color="#FFD336"
                  style={{marginTop: 2}}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <AntDesign
                name="calendar"
                size={20}
                color="#FFFF"
                style={{marginLeft: 10}}
              />
              <Text style={stylesCard.txt1}>
                {props.startDate} -- {props.totalDay} ngày
              </Text>
            </View>
            <View style={{flexDirection: 'row', margin: 5}}>
              <FontAwesome
                name="dollar"
                size={20}
                color="#FFFF"
                style={{marginLeft: 10}}
              />
              <Text style={stylesCard.txt1}>{props.price} VND</Text>
              <View style={{flexDirection: 'row'}}>
                <MaterialIcons
                  name="place"
                  size={20}
                  color="#FFFF"
                  style={{marginLeft: 10}}
                />
                <Text style={stylesCard.txt1}>{props.tourDestination}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#FFD336',
                    borderRadius: 20,
                    width: 80,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <Text style={{color: '#FFFFFF', fontSize: 12}}>Xác nhận</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 20,
                    width: 80,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <Text style={{color: '#FFFFFF', fontSize: 12}}>Hủy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={{alignItems: 'center'}}>
        {isExpanded == true ? (
          <MaterialIcons
            name="expand-more"
            size={25}
            color={COLOR.primary}
            style={{marginLeft: 10}}
          />
        ) : (
          <MaterialIcons
            name="expand-less"
            size={25}
            color={COLOR.primary}
            style={{marginLeft: 10}}
          />
        )}
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} props={props} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.primary,
    marginLeft: 20,
  },
  content: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    color: COLOR.primary,
    marginLeft: 20,
  },
});

export default CardOrder;
