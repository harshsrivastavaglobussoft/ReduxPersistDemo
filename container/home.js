import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const font = 'Helvetica-Light';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import {logout} from '../actions/index-action';

class Home extends Component {
  static navigationOptions = {  header: null };
  constructor(props) {
    super(props);
    this.state={
      name : this.props.navigation.state.params.name,
      emailid : this.props.navigation.state.params.emailid,
    };
  }
  render(){
    return(
      <ImageBackground style = {styles.viewContainer} source={require('../icons/home-background.jpg')} blurRadius={10}>
        <StatusBar barStyle="light-content"/>

        <View style = {styles.headerContainer}>
         <TouchableOpacity onPress = {()=>this._LogoutAction()}>
          <View style = {styles.backButtonContainer}>
           <Text style={{fontSize:18,fontFamily:font,color : 'white'}}>Log Out</Text>
          </View>
         </TouchableOpacity>
         <Text style = {styles.TitleContainer}>HOME</Text>
        </View>

        <Text style = {{marginTop :5,marginLeft : 10,fontSize : 25,color :'white',fontFamily : font,backgroundColor : 'transparent'}}>Hello!</Text>
        <Text style = {{marginTop :10,marginLeft : 10,fontSize : 20,color :'white',fontFamily : font,backgroundColor : 'transparent'}}>{this.state.name}</Text>
        <Text style = {{marginTop :10,marginLeft : 10,fontSize : 20,color :'white',fontFamily : font,backgroundColor : 'transparent'}}>Email Id: {this.state.emailid}</Text>

      </ImageBackground>
    );
  }
  _LogoutAction=()=>{
    this.props.logout(this);
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({logout : logout},dispatch);
}
const styles = StyleSheet.create({
  viewContainer : {
    flex : 1,
  },
  headerContainer : {
    height : 65,
    width : '100%',
    backgroundColor : 'rgba(22,23,25,0.5)',
    flexDirection : 'row',
  },
  backButtonContainer : {
    marginLeft : 10,
    marginTop : 25,
    height : 40,
    width : 100,
    backgroundColor : 'transparent',
  },
  TitleContainer : {
    marginLeft : 30,
    fontSize : 30,
    color : 'white',
    textAlign : 'center',
    fontFamily : font,
    marginTop : 22,
  },
});
export default connect(null,matchDispatchToProps)(Home);
