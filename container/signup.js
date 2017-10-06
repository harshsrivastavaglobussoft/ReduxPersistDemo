import React,{Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signup,nametext,emailtext,passwordtext,AddElements} from '../actions/index-action';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const font = 'Helvetica-Light';

 class  SignUp extends Component {
  static navigationOptions = {  header: null };
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed : false,
      elementAdded : false,
    }
  }
  _onNameChanged = (text) => {
    this.props.AuthUser.name= text;
    this.props.nametext(text);
  }
  _onEmailChanged = (text) =>{
    this.props.AuthUser.emailid=text;
    this.props.emailtext(text);
  }
  _onPasswordChanged = (text)=>{
    this.props.AuthUser.password=text;
    this.props.passwordtext(text);
  }
  componentDidUpdate(){
    if(this.state.buttonPressed === true){
    this._handleResponse();
    }
    if(this.state.elementAdded === true){
      this.state.elementAdded = false;
    this.props.navigation.navigate('SignInScreen');
    }
  }
  render(){
    return(

      <ImageBackground style={styles.viewContainer}  source={require('../icons/login-background.jpg')} blurRadius={10}>
      <StatusBar barStyle="light-content"/>
      <Text style={styles.welcomeContainer}>Welcome</Text>
      <View style={styles.textInputView}>
      <TextInput
        style={styles.TextInputView}
        placeholder="Name"
        placeholderTextColor = 'white'
        onChangeText={(text) => this._onNameChanged(text)}
        value={this.props.AuthUser.name}
      />
      <TextInput
        style={styles.TextInputView}
        placeholder="Email Id"
        placeholderTextColor = 'white'
        onChangeText={(emailid) => this._onEmailChanged(emailid)}
        value={this.props.AuthUser.emailid}
      />
      <TextInput
        style={styles.TextInputView}
        placeholder="Password"
        secureTextEntry = {true}
        placeholderTextColor = 'white'
        onChangeText={(password) => this._onPasswordChanged(password)}
        value={this.props.AuthUser.password}
      />
      {this._handleValidation()}
      </View>
      <TouchableOpacity onPress = {()=>this._onPressSignUpButton()}>
       <View style={styles.Button}>
         <Text style = {styles.buttonText}>Sign Up</Text>
       </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {()=>this._onPressSignInButton()}>
       <View style={styles.Button}>
         <Text style = {styles.buttonText}>Sign In</Text>
       </View>
      </TouchableOpacity>

      </ImageBackground>
    );
  }
  _onPressSignInButton=()=>{
    this.props.navigation.navigate('SignInScreen');
  }
 _onPressSignUpButton=()=>{
   this.state.buttonPressed = true;
   this.props.signup(this.props.AuthUser.name,this.props.AuthUser.emailid,this.props.AuthUser.password,this.props.UserArray.UserArray)
 }
  _handleValidation=()=>{
    if(this.props.AuthUser.error!==""){
      return(
      <View>
       <Text style={styles.errorContainer}>{this.props.AuthUser.error}</Text>
      </View>
    );
    }
  }
  _handleResponse=()=>{
    if(this.props.AuthUser){
      this.state.buttonPressed = false;
      if(this.props.AuthUser.code === 202){
        this.state.elementAdded = true;
        this.props.AddElements({name:this.props.AuthUser.name,emailid:this.props.AuthUser.emailid,password:this.props.AuthUser.password});
     }
    }
  }
}
function mapStateToProps(state){
  return {
    AuthUser: state.AuthUser,
    UserArray : state.UserArray,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    signup : signup,
    nametext : nametext,
    emailtext : emailtext,
    passwordtext : passwordtext,
    AddElements : AddElements,
  },dispatch);
}

const styles = StyleSheet.create({
  viewContainer : {
    flex : 1,
    flexDirection : 'column',
  },
  welcomeContainer : {
    marginTop : 100,
    left : window.width/2 - 100,
    color: 'white',
    width : 200,
    height : 80,
    backgroundColor : 'transparent',
    fontSize : 40,
    textAlign : 'center',
    fontFamily : font,
  },
  textInputView : {
    height : 250,
    width : '100%',
    backgroundColor : 'transparent',
    flexDirection : 'column',
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
  errorContainer : {
    marginTop: 15,
    backgroundColor : 'transparent',
    fontSize : 12,
    fontFamily : font,
    color : 'white',
    textAlign : 'center',
  },
});
export default connect(mapStateToProps,matchDispatchToProps)(SignUp);
