import "react-native-gesture-handler";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";


import Mapviewlist from "../modules/search/Mapviewlist";

const Stack = createStackNavigator();
const headeroptions = { headerShown: false };
class Router extends Component {
  constructor(props) {
    super(props);
    Icon.loadFont();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={headeroptions}
            name="mapviewlist"
            component={Mapviewlist}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

stateToProps = (state) => {
  return {};
};

export default connect(stateToProps, null)(Router);
