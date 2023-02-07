import {StyleSheet} from 'react-native';
import COLOR from '../../res/color';
const stylesTour = StyleSheet.create({
  title: {
    color: COLOR.primary,
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 4,
  },
  txt: {
    color: COLOR.primary,
    fontFamily: 'Ubuntu',
    fontSize: 14,
    marginLeft: 5,
  },
  btn: {
    backgroundColor: COLOR.primary,
    borderRadius: 100,
    height: 50,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  txt_btn: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default stylesTour;
