import { StyleSheet } from 'react-native';
import COLOR from '../../res/color';
const stylesManage = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    txt_name: {
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        fontSize: 24,
        color: COLOR.primary,
    },
    title: {
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        fontSize: 18,
        color: COLOR.primary,
    },
    input: {
        borderRadius: 15,
        fontSize: 16,
        color: '#000000',
        width: 335,
        height: 48,
        backgroundColor: '#ECECF9',
        shadowColor: '#000000',
        shadowOpacity: 1,
        shadowRadius: 90,
        shadowOffset: {
            width: 335,
            height: -48,
        },
    },
    btn: {
        borderRadius: 5,
        backgroundColor: '#ECECF9',
        width: 335,
        height: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        flexDirection: 'row',
    },
});

export default stylesManage;
