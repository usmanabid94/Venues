import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'

class Tab3 extends Component {
  constructor(props) {
    super(props);
    console.log("tabs3props",props)
}
  render() {
    return (
      <View style={styles.container}>
          {/* <FavouriteListing {...this.props}/> */}
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

// const mapStateToProps = (state) => {
//   return {

//   }

// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveUser: params => dispatch(Actions.saveUser(params))
//   }
// }
export default Tab3 
//connect(mapStateToProps, mapDispatchToProps)(Tab3);