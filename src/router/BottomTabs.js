import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/';



import * as Helpers from '../helpers/Exporter'


import Tab1 from '../modules/tabs/Tab1'
import Tab2 from '../modules/tabs/Tab2'
import Tab3 from '../modules/tabs/Tab3'
import Tab4 from '../modules/tabs/Tab4'
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();
const Tabs = AnimatedTabBarNavigator();

class BottomTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appColor:''
        }
        this.getColor()
        console.log("BOttomTab",props)
    }
    
    getColor = async()=>{
        var mainColor = await AsyncStorage.getItem('appColor')
       this.setState({appColor:mainColor})
        console.log("mainCOlor",mainColor)
    }
render() {
    return (
        <Tab.Navigator
            tabBarOptions={{ style:{height:Platform.OS == "ios"?Helpers.WP('14')  :Helpers.WP('19'),borderTopEndRadius: Helpers.WP(8),borderTopStartRadius: Helpers.WP(8)}, showLabel:false}}//,showLabel:false style: styles.tabBar,
            screenOptions={({ route }) => (
                console.log(route),
               
                {
                //  tabBarLabel: ({ focused, color, position, }) => (
                //     <Text style={[focused ? [styles.focusedTabText,{color:"red"}] : styles.unfocusedTabText]}>{route.name}</Text>
                // ),
                // tabBarIcon: ({ focused, color, size, }) => (
                //     <Image 
                //    source={ route.name == 'Home' ? Helpers.Images.home: route.name == "Agents" ?  Helpers.Images.agent : Helpers.Images.heartfilled}
                //    style={{height:(21),width:(21),tintColor: route.name != "Agents" && "red"}}
                //    />
                // ),
               })}
        >


            <Tab.Screen name="Home"  
                //    children={()=><Tab1 props={this.props}/>}

            component={Tab1}
             key="tab1" options={{
               tabBarLabel: 'Home',
               tabBarIcon: ({ focused, color, size }) => (
                   <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                   source={Helpers.Images.mapLogo}
                   style={{height:(21),width:(21),tintColor:focused?'#3078ff' :"#6b7280"}}
                   />
                       <Text style={[focused ? [styles.focusedTabText,{color:"#3078ff",top:Helpers.WP(1)}] : [styles.unfocusedTabText,{top:Helpers.WP(1)}]]}>Co-work</Text>
                   </View>
               ),
            }} />
            <Tab.Screen name="Agents" component={Tab2} key="tab2" options={{
               tabBarLabel: 'Home',
               tabBarIcon: ({ focused, color, size }) => (
                   <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                   source={Helpers.Images.bookingLogo}
                   style={{height:(21),width:(21),tintColor:focused?'#3078ff' :"#6b7280"}}
                   />
                       <Text style={[focused ? [styles.focusedTabText,{color:"#3078ff",top:Helpers.WP(1)}] :[styles.unfocusedTabText,{top:Helpers.WP(1)}]]} >Book</Text>
                   </View>
               ),
            }}/>
            <Tab.Screen name="Favourite" component={Tab3} key="tab3" 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                         <Image 
                    source={Helpers.Images.homeLogo}
                    style={{height:(21),width:(21),tintColor:focused?'#3078ff' :"#6b7280"}}
                    />
                        <Text style={[focused ? [styles.focusedTabText,{color:"#3078ff",top:Helpers.WP(1)}] : [styles.unfocusedTabText,{top:Helpers.WP(1)}]]}>Home</Text>
                    </View>
                ),
             }} />
              <Tab.Screen name="Chat" component={Tab3} key="tab3" 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                         <Image 
                    source={Helpers.Images.chatLogo}
                    style={{height:(21),width:(21),tintColor:focused?'#3078ff' :"#6b7280"}}
                    />
                        <Text style={[focused ? [styles.focusedTabText,{color:"#3078ff",top:Helpers.WP(1)}] : [styles.unfocusedTabText,{top:Helpers.WP(1)}]]}>Chat</Text>
                    </View>
                ),
             }} />
              <Tab.Screen name="Profile" component={Tab3} key="tab3" 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                         <Image 
                    source={Helpers.Images.profileLogo}
                    style={{height:(21),width:(21),tintColor:focused?'#3078ff' :"#6b7280"}}
                    />
                        <Text style={[focused ? [styles.focusedTabText,{color:"#3078ff",top:Helpers.WP(1)}] : [styles.unfocusedTabText,{top:Helpers.WP(1)}]]}>Profile</Text>
                    </View>
                ),
             }} />

        </Tab.Navigator>

    );
}


}

stateToProps = (state) => {
    return {}
}

const styles = StyleSheet.create({
    tabBar: {
        // borderTopEndRadius: Helpers.WP(5),
        // borderTopStartRadius: Helpers.WP(5),
        // borderColor:'red',
        // borderWidth:2,
        backgroundColor: Helpers.Theme.introBg,
        // position: 'absolute',
        // borderColor:'red',
        // borderWidth:2,
        // alignItems:'center',
        // bottom: 2,
        width: Helpers.WP(100),
        height: Helpers.WP(16),
        padding:Helpers.WP('2')
        // zIndex: 8
    },
    focusedTabText: {
        fontSize: 12,
        color: Helpers.Theme.primary,
        fontFamily:'BrandonText-Bold'
        // bottom:Helpers.WP('1'),
        // padding:Helpers.WP('2')
    },
    unfocusedTabText: {
        fontSize: 12,
        color: Helpers.Theme.dark,
        fontFamily:'BrandonText-Regular'

        // padding:Helpers.WP('2')
// 
        // bottom:Helpers.WP('1')

    },


})

export default connect(stateToProps, null)(BottomTabs);


// render() {
//     return (
//         <Tabs.Navigator
//             tabBarOptions={{
//                 activeTintColor: "#2F7C6E",
//                 inactiveTintColor: "#222222", activeBackgroundColor: '#FFCF64',
//             }}
//         >
//             <Tabs.Screen
//                 name="Home"
//                 component={Tab1}
//                 options={{
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <MaterialCommunityIcons
//                             name={'home'}
//                             color={focused ? Helpers.Theme.primary : Helpers.Theme.grey}
//                             size={focused ? Helpers.Typography.six : Helpers.Typography.four} />
//                     )
//                 }}
//             />

//             <Tabs.Screen
//                 name="Account"
//                 component={Tab2}
//                 options={{
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <MaterialCommunityIcons
//                             name={'account-circle'}
//                             color={focused ? Helpers.Theme.primary : Helpers.Theme.grey}
//                             size={focused ? Helpers.Typography.six : Helpers.Typography.four} />
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="Third"
//                 component={Tab3}
//                 options={{
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <MaterialCommunityIcons
//                             name={'account-circle'}
//                             color={focused ? Helpers.Theme.primary : Helpers.Theme.grey}
//                             size={focused ? Helpers.Typography.six : Helpers.Typography.four} />
//                     )
//                 }}
//             />

//             <Tabs.Screen
//                 name="Fourth"
//                 component={Tab4}
//                 options={{
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <MaterialCommunityIcons
//                             name={'account-circle'}
//                             color={focused ? Helpers.Theme.primary : Helpers.Theme.grey}
//                             size={focused ? Helpers.Typography.six : Helpers.Typography.four} />
//                     )
//                 }}
//             />
             
//         </Tabs.Navigator>

//     );
// }