import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import * as Actions from '../../store/actions/allActions'

class Tab2 extends Component {
  constructor(props) {
    super(props);
    console.log("tabs2props",props)
}
  render() {
    return (
      <View style={styles.container}>
        {/* <Agents {...this.props}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#d8d8d8'
  },
  
})

const mapStateToProps = (state) => {
  return {

  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: params => dispatch(Actions.saveUser(params))
  }
}
export default Tab2
//connect(mapStateToProps, mapDispatchToProps)(Tab2);