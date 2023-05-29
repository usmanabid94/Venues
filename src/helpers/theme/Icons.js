import React from 'react'
import {Image,StyleSheet, ImagePropTypes }from 'react-native'
import * as Helpers from '../Exporter'
import {WP} from '../Exporter'

export const leftArrow = (props) => {
    return (
        <Image
        source={Helpers.Images.backArrow}
        style={[styles.backArrow,{tintColor:props.color}]}
        />
    )

}
export const downArrow = () => {
    return (
        <Image
        source={Helpers.Images.backArrow}
        style={styles.backArrow}
        />
    )

}
const styles=StyleSheet.create({
    backArrow:{
        height:WP(7),
        width:WP(7),
        resizeMode:'contain',
        tintColor:Helpers.Theme.light
    }
})


