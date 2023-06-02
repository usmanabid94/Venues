import {StyleSheet} from 'react-native'
import * as Helpers from '../../helpers/Exporter'
import { WP as wp } from '../../helpers/Exporter'

import {WP} from '../../helpers/Exporter'
export const styles = StyleSheet.create({
    container: {
        backgroundColor: Helpers.Theme.light
    },
    mainbody: {
        height: '85%', width: '100%', marginTop: wp(5)
    },
    modalBoxStyle: {
        alignItems: 'center',
        height:wp(40),
        borderRadius: 10,
        padding:WP(3),
        justifyContent:'center',
        width:'60%',

    },
    modalContentContainer: {
        width: '95%',
        // backgroundColor: 'yellow',
        // paddingBottom: 15,
        // alignItems:'center',
        // justifyContent:'center',

    },
    subHeadingText: {
        color: '#999999',
        fontSize: 16,
        marginTop: 10,
        fontWeight: '400',

    }, 
    modaBoxInnerContainer:{
        width:'100%',
      
        height:wp(30)
      },
      modalScrollviewContainer:{
        // width:'70%',
        // justifyContent:'center',

       //  paddingBottom:15,
       
      },
      modalText:{

        fontSize:WP(4),
        // alignSelf:'center',
        // color:Appearences.Colors.grey,
        
      
      },
    listBtn: {
        // height: wp(44),
        width: "92%", alignSelf: 'center',
        borderWidth: 1, borderColor: Helpers.Theme.blueBtnBorder,
        borderRadius: wp(1.3), backgroundColor: Helpers.Theme.light,
        flexDirection: "row", marginBottom: wp(2)
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
    listBtn_rightVw_heartBtn: { position: 'absolute', right: wp(4), top: wp(4) },
    listBtn_rightVw_heartBtn_Img: { height: wp(4), width: wp(4) },

    mainHeader: {
        height: Helpers.WP(30),
        width: '100%',
        backgroundColor: Helpers.Theme.light,

        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtn: {
        position: 'absolute', left: wp(5)
    },
    mainlogo: {
        height: wp(10), width: wp(30),
        resizeMode: "contain"
    },
    secondpartHeader_txtVw: {
        position: 'absolute', left: wp(5)
    },
    secondpartHeader_BtnVw: {
        flexDirection: 'row', position: 'absolute', right: wp(0.5),
    },
    secondpartHeader_BtnVw_firstBtn: {
        height: wp(7), width: wp(8),
        // borderColor: Helpers.Theme.blueBtnBorder,
        alignItems: 'center', justifyContent: 'center',
        // borderWidth: 1, borderRadius: wp(1),
         marginRight: wp(2)
    },

    secondpartHeader_BtnVw_secondBtn: {
        height: wp(7), width: wp(16),
        borderColor: Helpers.Theme.blueBtnBorder,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1, borderRadius: wp(1), backgroundColor: Helpers.Theme.blueBtnBg
    },
    secondpartHeader_BtnVw_secondBtn_Txt: {
        color: Helpers.Theme.light, fontWeight: '600'
    },
    secondpartHeader_BtnVw_firstBtn_Img: {
        height: wp(5), width: wp(5),
        resizeMode: "contain"
    },
    secondpartHeader_txtVw_first: {
        color: Helpers.Theme.blueBtnBg, fontWeight: '600'
    },
    secondpartHeader_txtVw_second: {
        color: Helpers.Theme.black, fontWeight: '400'
    },
    secondpartHeader: {
        height: wp(12)
    },
    boxWithShadow: {
        shadowColor: '#d8d8d8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    header: {
        height: Helpers.WP(12),
        width: '100%',
        backgroundColor: Helpers.Theme.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingTxt: {
        color: Helpers.Theme.light,
        marginLeft: Helpers.WP(5),
        fontWeight: '600'

    },
    resetTxt: {
        color: Helpers.Theme.black,
        fontWeight: '400'

    },
    resetBtn: {
        position: 'absolute', right: Helpers.WP(5)
    },
})
