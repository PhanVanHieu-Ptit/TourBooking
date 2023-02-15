import {StyleSheet} from 'react-native';
import COLOR from '../../res/color';
const stylesDetailTour = StyleSheet.create({
  title: {
    color: COLOR.primary,
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    color: COLOR.primary,
    fontFamily: 'Ubuntu',
    fontSize: 12,
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: COLOR.primary,
    borderRadius: 10,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt_btn: {
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default stylesDetailTour;
