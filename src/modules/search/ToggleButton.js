import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WP } from '../../helpers/Exporter';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 'login',
    };
  }

  handleToggle = (button) => {
    this.setState({
      activeButton: button,
    });
  };

  render() {
    const { activeButton } = this.state;
    const { activeColor, inactiveColor } = this.props;

    const signUpButtonStyle = activeButton === 'signup'
      ? [styles.button, { backgroundColor: activeColor }]
      : [styles.button, { backgroundColor: inactiveColor }];

    const loginButtonStyle = activeButton === 'login'
      ? [styles.button, { backgroundColor: activeColor }]
      : [styles.button, { backgroundColor: inactiveColor }];

    const signUpTextStyle = activeButton === 'signup'
      ? [styles.buttonText, { color: '#3078ff' }]
      : [styles.buttonText,{color:'#e5e7eb'}];

    const loginTextStyle = activeButton === 'login'
      ? [styles.buttonText, { color: '#3078ff' }]
      : [styles.buttonText,{color:'#e5e7eb'}];

    return (
      <View style={styles.container}>
         <TouchableOpacity
          style={loginButtonStyle}
          onPress={() => this.handleToggle('login')}
        >
          <Text style={loginTextStyle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signUpButtonStyle}
          onPress={() => this.handleToggle('signup')}
        >
          <Text style={signUpTextStyle}>Sign Up</Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e5e7eb',
    borderRadius:WP('8'),
    margin:WP('1'),
    padding:WP('1.5')
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ToggleButton;
