import React,{Component} from 'react';
import {
  AppRegistry,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import SignUp from '../container/signup';
import SignIn from '../container/signin';
import Home from '../container/home'
class NavigationClass extends Component {
  render(){
    const { navigation } = this.props;
    return (
      <StackNavigation navigation={ navigation }/>
    );
  }
}

const StackNavigation = StackNavigator({
  SignUpScreen: {
    screen: SignUp,
    navigationOptions:{
      title: 'Sign Up',
    }
  },
  SignInScreen : {
    screen: SignIn,
    navigationOptions:{
      title: 'Sign In',
    }
  },
  Home : {
    screen: Home,
    navigationOptions:{
      title: 'Home',
    }
  },
});

export default StackNavigation;

AppRegistry.registerComponent('NotePadApp',() => StackNavigation);
