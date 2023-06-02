import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import Mapviewlist from '../search/Mapviewlist';
class Tab1 extends Component {
  
  constructor(props) {
    super(props);
    console.log("tabs1props",props)
}
  componentDidMount(){
    
    // this.checkPalidrome(1221)
    // this.checkPalindrome('aaaaaaaaxxbyxxaaaaaaaa')
  }
  checkPalidrome=(num)=>{
    var remainder
    var sum=0
    var temp=num

    while(num>0){


      remainder=parseInt(num%10)
      // console.log('remainder=num%10',remainder)
      sum=parseInt((sum*10))+parseInt(remainder)
      // console.log('sum=(sum*10)+remainder',sum)
      num=parseInt(num/10)
      // console.log('temp=num/10',num)

      console.log('\n\n')

    }
    if(temp==sum){
      console.log('PALIDROOOME!!!')
    }



  }

  checkPalindrome=(str)=>{
    for(let i=0,j=str.length-1;i<str.length/2;i++,j--){
      if(str[i]==str[j]){
        console.log('Going good so far',str[i]+".."+str[j])
      }else{
        console.log('nope heres a mismatch',str[i]+".."+str[j])
      }
    }
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Mapviewlist {...this.props}/>

     
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
export default Tab1
// connect(mapStateToProps, mapDispatchToProps)(Tab1);