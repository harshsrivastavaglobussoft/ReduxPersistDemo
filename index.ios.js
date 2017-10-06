import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import {createStore,compose} from 'redux';
import {Provider} from 'react-redux';
import AllReducer from './reducers/reducer-index';
import StackNavigation from './components/navigation';
import {persistStore, autoRehydrate} from 'redux-persist';

const store = compose(autoRehydrate())(createStore)(AllReducer)

const persister = persistStore(store, {storage: AsyncStorage})
export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount(){
    persistStore(store, {storage:AsyncStorage}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return (<Text>Loading...</Text>);
    }
    return (
      <Provider store={store} persister={persister}>
         <StackNavigation />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('LocalDBProject', () => Index);
