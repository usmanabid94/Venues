import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/allActions'
import * as Helpers from '../../helpers/Exporter'
import { WP as wp } from '../../helpers/Exporter'



class Splash extends Component {

    async componentDidMount() {
        setTimeout(() => {
            this.reset('BottomTabs')
        }, 500);
    }




    navigate = (where) => {
        this.props.navigation.navigate(where)
    }

    reset = (route) =>{
        this.props.navigation.reset({
            routes: [{ name: route }]
          });
    }


    render() {
        return (
            <View style={styles.container}>


                <Image
                    source={Helpers.Images.letsworkLogo}
                    style={{ height: wp(40), width: wp(40), resizeMode: 'contain' }}
                />

                <View style={{ position: 'absolute', bottom: wp(40) }}>
                    {
                        this.props.loading ?
                            <Helpers.Lumper lumper={true} color={Helpers.Theme.blueBtnBg} />
                            : []
                    }
                </View>

                <Image
                    source={Helpers.Images.splashBottom}
                    style={{ height: wp(18), position: 'absolute', width: wp(100), bottom: 0, resizeMode: 'contain' }}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Helpers.Theme.introBg,
        justifyContent: 'center'

    },

    topView: {
        height: Helpers.WP(10),
        width: '100%', justifyContent: 'center'
    },

    skipBtn: {
        alignSelf: 'flex-end',
        marginRight: Helpers.WP(4)
    },
    skipTxt: {
        color: Helpers.Theme.blueBtnBg,
        fontWeight: '500'

    },

    mainImg: {
        height: '56%', width: Helpers.WP(100),
        marginTop: Helpers.WP(5)
    },

    helpView: {
        marginTop: Helpers.WP(10)
    },
    helpTxt: {
        fontWeight: '700'
    },

    buttonsContainer: {
        width: '100%',
        justifyContent: 'center', flexDirection: 'row',
        paddingHorizontal: Helpers.WP(4),
        marginTop: Helpers.WP(5),
    },


    blueBtn: {
        height: Helpers.WP(10), width: Helpers.WP(43),
        backgroundColor: Helpers.Theme.blueBtnBg,
        alignItems: 'center', justifyContent: "center",
        borderRadius: Helpers.WP(1),
        borderWidth: Helpers.WP(0.1), borderColor: Helpers.Theme.blueBtnBorder,
    },
    blueBtnTxt: {
        color: Helpers.Theme.light,
        fontWeight: '600'
    },
    marginLeft: {
        marginLeft: Helpers.WP(4)
    },
    marginTop: {
        marginTop: Helpers.WP(5)
    },

    whiteBtn: {
        height: Helpers.WP(12), width: Helpers.WP(90),
        backgroundColor: Helpers.Theme.light,
        borderWidth: Helpers.WP(0.1), borderColor: Helpers.Theme.blueBtnBorder,
        borderRadius: Helpers.WP(1),
        alignItems: 'center', justifyContent: "center",
    }



})
export default Splash
