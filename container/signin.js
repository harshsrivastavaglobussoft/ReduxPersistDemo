import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
login,
emaillogin,
passwordlogin,
resetAuthUser,
}from '../actions/index-action';

const font = 'Helvetica-Light';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

class  SignIn extends Component {
  static navigationOptions = {  header: null };
  constructor(props){
    super(props);
      this.state={
        buttonPressed : true
      };
    }

  _onEmailChanged = (text) =>{
    this.props.ActiveUser.emailid = text;
    this.props.emaillogin(text);
  }
  _onPasswordChanged =(text)=>{
    this.props.ActiveUser.password = text;
    this.props.passwordlogin(text);
  }
  componentDidUpdate(){
    if (this.state.buttonPressed === true) {
      this._HandleSigninResponse();
    }
  }
  componentWillMount(){

  }
  render(){
    return(
      <ImageBackground style={styles.viewContainer} source = {require('../icons/background-screen2.jpg')} blurRadius = {10}>
       <View style = {styles.headerContainer}>
       <TouchableOpacity onPress = {()=>this._onPressBackButton()}>
        <View style = {styles.backButtonContainer}>
         <Text style={{fontSize:18,fontFamily:font,color : 'white',textAlign : 'center'}}>Go Back</Text>
        </View>
        </TouchableOpacity>
       </View>
      <Text style={styles.headingContainer}>Sign In</Text>
      <View style={styles.textInputView}>
      <TextInput
        style={styles.TextInputView}
        placeholder="Email Id"
        placeholderTextColor = 'white'
        onChangeText={(emailid) => this._onEmailChanged(emailid)}
        value={this.props.ActiveUser.emailid}
      />
      <TextInput
        style={styles.TextInputView}
        placeholder="Password"
        secureTextEntry = {true}
        placeholderTextColor = 'white'
        onChangeText={(password) => this._onPasswordChanged(password)}
        value={this.props.ActiveUser.password}
      />
      {this._handleValidation()}
      </View>
      <TouchableOpacity onPress = {()=>this._signInPress()}>
       <View style={styles.Button}>
         <Text style = {styles.buttonText}>Sign In</Text>
       </View>
      </TouchableOpacity>
      </ImageBackground>
    );
  }
  _onPressBackButton=()=>{
    this.props.navigation.goBack();
  }
  _handleValidation=()=>{
    if(this.props.ActiveUser.error!==""){
      return(
      <View>
       <Text style={styles.errorContainer}>{this.props.ActiveUser.error}</Text>
      </View>
    );
    }
  }
  _signInPress=()=>{
    this.state.buttonPressed = true;
    this.props.login(this.props.ActiveUser.emailid,this.props.ActiveUser.password,this.props.UserArray.UserArray);
  }
  _HandleSigninResponse=()=>{
      console.log('*-**-**--*-***-****--***-*******',this.props.ActiveUser);
      this.state.buttonPressed= false;
      if(this.props.ActiveUser){
        if(this.props.ActiveUser.code === 200){
              console.log("happpyyyyy");
         this.props.navigation.navigate('Home',{name:this.props.ActiveUser.name,emailid:this.props.ActiveUser.emailid});
       }
      }
    }
}
function mapStateToProps(state){
  return {
    ActiveUser: state.ActiveUser,
    UserArray: state.UserArray,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    emaillogin : emaillogin,
    passwordlogin : passwordlogin,
    login : login,
    resetAuthUser:resetAuthUser,
  },dispatch);
}



const styles = StyleSheet.create({
  viewContainer : {
    flex : 1,
    flexDirection : 'column',
  },
  headerContainer : {
    height : 65,
    width : '100%',
    backgroundColor : 'rgba(22,23,25,0.5)',
  },
  backButtonContainer : {
    marginLeft : 10,
    marginTop : 25,
    height : 40,
    width : 100,
    backgroundColor : 'transparent',
  },
  headingContainer : {
    marginTop : 50,
    left : window.width/2 - 100,
    color: 'white',
    width : 200,
    height : 80,
    backgroundColor : 'transparent',
    fontSize : 40,
    textAlign : 'center',
    fontFamily : font,
    justifyContent : 'center',
  },
  textInputView : {
    height : 200,
    width : '100%',
    backgroundColor : 'transparent',
    flexDirection : 'column',
  },
  TextInputView : {
    marginTop : 10,
    height : 40,
    width : 300,
    borderWidth : 1,
    marginLeft : window.width/2-150,
    borderRadius : 30,
    borderColor : 'white',
    justifyContent : 'center',
    color : 'white',
    paddingLeft : 10,
    fontSize : 15,
  },
  Button : {
    marginTop : 30,
    height : 50,
    width : 250,
    borderWidth : 2,
    marginLeft : window.width/2-125,
    borderRadius : 30,
    borderColor : 'white',
    justifyContent : 'center',
  },
  buttonText : {
    textAlign : 'center',
    fontSize : 20,
    color : 'white',
    fontFamily : font,
    backgroundColor : 'transparent',
  },
  errorContainer : {
    marginTop: 15,
    backgroundColor : 'transparent',
    fontSize : 12,
    fontFamily : font,
    color : 'white',
    textAlign : 'center',
  },
});
export default connect(mapStateToProps,matchDispatchToProps)(SignIn);
