import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';



import BottomTabs from './BottomTabs'
import Mapviewlist from '../modules/search/Mapviewlist';
import Splash from '../modules/intro/Splash';


const Stack = createStackNavigator();
const headeroptions = { headerShown: false }
class Router extends Component {
    constructor(props) {
        super(props);
        Icon.loadFont()
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                   {/* // <Stack.Screen options={headeroptions} name="dummy" component={CustomInput} /> */}

                    <Stack.Screen options={headeroptions} name="splash" component={Splash} />
                    <Stack.Screen options={headeroptions} name ="BottomTabs" component={BottomTabs}/>
                    {/* <Stack.Screen options={headeroptions} name="introMain" component={IntroMain} />
                    <Stack.Screen options={headeroptions} name="locationShare" component={LocationShare} />
                    <Stack.Screen options={headeroptions} name="filter" component={Filter} />
                    <Stack.Screen options={headeroptions} name="searchlist" component={Searchlist} /> */}
                    <Stack.Screen options={headeroptions} name="mapviewlist" component={Mapviewlist} />
                    {/* <Stack.Screen options={headeroptions} name="Agents" component={Agents} />
                    <Stack.Screen options={headeroptions} name="AgentDetail" component={AgentDetail} />
                    <Stack.Screen options={headeroptions} name="AgentFilter" component={AgentFilter} />
                    <Stack.Screen options={headeroptions} name="FavouriteListing" component={FavouriteListing} />
                    <Stack.Screen options={headeroptions} name="listingdetail" component={ListingDetail} />
                    <Stack.Screen options={headeroptions} name="locationmap" component={LocationMap} />
                    <Stack.Screen options={headeroptions} name="virtualtour" component={VirtualTour} />
                    <Stack.Screen options={headeroptions} name="whatsnearby" component={WhatsNearby} />
                    <Stack.Screen options={headeroptions} name="floorplans" component={FloorPlans} />
                    <Stack.Screen options={headeroptions} name="mortgagecalculator" component={MortgageCalculator} />
                    <Stack.Screen options={headeroptions} name="scheduletour" component={ScheduleTour} />
                    <Stack.Screen options={headeroptions} name="reviewrating" component={ReviewRating} />
                    <Stack.Screen options={headeroptions} name="writereview" component={WriteReview} />
                    <Stack.Screen options={headeroptions} name="contactseller" component={ContactSeller} />
                    <Stack.Screen options={headeroptions} name="attachments" component={Attachments} />
 */}

                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}

stateToProps = (state) => {
    return {}
}

export default connect(stateToProps, null)(Router);