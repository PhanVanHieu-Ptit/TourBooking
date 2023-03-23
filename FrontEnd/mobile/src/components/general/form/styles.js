import { StyleSheet } from 'react-native';
import COLOR from '../../../res/color';
const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 500,
        backgroundColor: '#000000',
        opacity: 1, //0.8,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        width: 80,
        height: 30,
        // marginTop: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#021A5A',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: '#000000',
        fontFamily: 'Ubuntu',
        marginBottom: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        color: COLOR.primary,
        fontFamily: 'Ubuntu',
        marginBottom: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default stylesModal;
