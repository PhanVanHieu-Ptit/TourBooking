import { StyleSheet } from 'react-native';
import COLOR from '../../../res/color';
const stylesCard=StyleSheet.create({
    img: {
        borderRadius: 15,
        width: 140,
        height: 160,
        marginLeft: 10,
        marginTop: 10,
        overflow: 'hidden',
    },
    viewStar: {
        flexDirection: 'row',
        // marginStart: 2,
        // marginEnd: 10,
        marginTop: 5,
        backgroundColor: '#575B66',
        width: 40,
        borderRadius: 5,
        justifyContent: 'space-around',
    },
    txt1: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Ubuntu',
        marginLeft: 5,
    },
    txt2: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'Ubuntu',
        marginLeft: 5,
    },
    txt3: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Ubuntu',
        marginLeft: 5,
    },
    card2: {
        borderRadius: 20,
        display: 'flex',
        width: 343,
        height: 112,
        backgroundColor: '#010126',
        marginTop: 10,
        marginLeft: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    img2: {
        width: 100,
        height: 100,
        marginLeft: 7,
        borderRadius: 11,
    },
});

export default stylesCard;
