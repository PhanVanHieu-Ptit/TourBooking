import {StyleSheet} from 'react-native';
const stylesHeader = StyleSheet.create({
  header: {
    backgroundColor: '#D4D4D4',
    borderRadius: 10,
    // opacity: 0.24,
    marginTop: 20,
    // marginLeft: 15,
    width: 335,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  view_info: {
    flexDirection: 'row',
  },
  view_txt: {
    justifyContent: 'center',
  },
  img: {
    width: 42,
    height: 38,
    borderRadius: 40,
  },
  title1: {
    fontFamily: 'Ubuntu',
    color: '#021A5A',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title2: {
    fontFamily: 'Ubuntu',
    color: '#021A5A',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default stylesHeader;
