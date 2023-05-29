import {StyleSheet} from 'react-native'
import * as Helpers from '../../helpers/Exporter'
import { WP as wp } from '../../helpers/Exporter'

import {WP} from '../../helpers/Exporter'

export const styles = StyleSheet.create({
    header: {
        height: wp(12), width: '100%',
        position: 'absolute', zIndex: 10, top: wp(5),
        flexDirection: 'row'
    },
    header_backBtn: {
        backgroundColor: Helpers.Theme.light, marginLeft: wp(5), justifyContent: 'center',
        borderRadius: wp(5), height: wp(10), width: wp(10), alignSelf: "center",
        alignItems: 'center'
    },
    header_backImg: {
        height: wp(5), width: wp(5), resizeMode: 'contain'
    },
    header_rightVw: {
        height: wp(12), width: wp(77), backgroundColor: Helpers.Theme.light,
        marginLeft: wp(3), alignSelf: 'center', borderRadius: wp(1.5), flexDirection: 'row',
        alignItems: 'center'
    },
    header_rightVw_searchBtn: {
        height: '100%', width: wp(10),
        alignItems: 'center', justifyContent: 'center'
    },
    header_rightVw_searchImg:{
        height: wp(5), width: wp(5),
         tintColor: Helpers.Theme.blueBtnBg 
    },
    middleLine:{
        width: 1, 
        height: wp(6),
        backgroundColor: Helpers.Theme.gryBack, 

    },
    searchInput:{
        height: wp(10), width: wp(50),
         marginLeft: wp(1)
    },



    pickerPlaceholder:{
        color: '#000', marginRight: wp(3.5)
    },
    pickerContainer:{
        backgroundColor: Helpers.Theme.introBg,
        width: wp(16),
        alignSelf: 'center', alignItems: 'center',
        borderTopRightRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
        borderLeftWidth: wp(0.1),
    },
    pickerIcon:{
        height: wp(3), width: wp(3),
         right: wp(2), top: wp(4.8)
    },




    listBtn: {
        // height: wp(44),
        position:'absolute',bottom:0,zIndex:10,
        width: "95%", alignSelf: 'center',
        borderWidth: 1, borderColor: Helpers.Theme.blueBtnBorder,
        borderRadius: wp(1.3), backgroundColor: Helpers.Theme.light,
        flexDirection: "row", marginBottom: wp(2),paddingLeft:wp(2)
    },
    listBtn_leftVw: {
        height: wp(40), width: '40%',alignSelf:'center',
        borderTopLeftRadius: wp(1.3), borderBottomLeftRadius: wp(1.3)
    },
    listBtn_leftVw_featureImg:{
        height: wp(6), width: wp(6), 
        position: 'absolute',
        top: wp(2), left: wp(1),
         resizeMode: 'contain'
    },

    listBtn_leftVw_lblVw: {
        paddingVertical: wp(1), paddingHorizontal: wp(1),
        borderRadius: wp(0.5),
        position: 'absolute',
        bottom: wp(2), left: wp(1),

    },

    listBtn_rightVw: {
        height: '100%', width: '60%', padding: wp(3)
    },
    listBtn_rightVw_titleTxt: { marginTop: wp(1), color: Helpers.Theme.black, width: wp(50) },
    listBtn_rightVw_addressVw: { flexDirection: 'row', alignItems: 'center', marginTop: wp(1.5), marginLeft: wp(-0.5) },
    listBtn_rightVw_typeTxt: { marginTop: wp(1.5), color: Helpers.Theme.darkgrey, width: wp(45) },
    listBtn_rightVw_bedbathVw: {
        marginTop: wp(2.2),
        flexDirection: "row",
        width: wp(50)
    },
    listBtn_rightVw_bedbathVw_twoVws:{
        flexDirection: 'row', marginLeft: wp(2)
    },
    listBtn_rightVw_bedbathVw_Img: {
        height: wp(3.5), width: wp(3.5), marginRight: wp(1),
        tintColor: Helpers.Theme.blueBtnBg
    },

    listBtn_rightVw_buttonsVw: { flexDirection: 'row', marginTop: wp(3) },
    listBtn_rightVw_buttonsVw_firstBtn: {
        height: wp(8), width: wp(24),
        flexDirection: 'row', justifyContent: 'center', alignItems: "center",
        borderColor: Helpers.Theme.whatsapp,
        borderWidth: 1, borderRadius: wp(0.5)
    },
    listBtn_rightVw_buttonsVw_firstBtn_Img: {
        height: wp(4), width: wp(4),
        resizeMode: 'contain',
        marginRight: wp(1)
    },
    listBtn_rightVw_buttonsVw_secondBtn: {
        height: wp(8), width: wp(24), flexDirection: 'row',
        marginLeft: wp(2),
        justifyContent: 'center', alignItems: "center",
        backgroundColor: Helpers.Theme.blueBtnBg, borderRadius: wp(0.5)
    },
    listBtn_rightVw_buttonsVw_secondBtn_Img: {
        height: wp(3), width: wp(3),
        resizeMode: 'contain',
        tintColor: Helpers.Theme.light, marginRight: wp(1)
    },
    listBtn_rightVw_bedbathVw_bedsTxt: { marginLeft: wp(0.5), color: Helpers.Theme.darkgrey, },
    listBtn_rightVw_heartBtn: { position: 'absolute', right: wp(2), top: wp(2) },
    listBtn_rightVw_heartBtn_Img: { height: wp(4), width: wp(4) },

})
