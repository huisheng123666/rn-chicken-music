import React from 'react';
import { Provider } from 'react-redux'
import {View} from 'react-native';
import Header from './src/components/header/header'
import Player from './src/components/player/player'
import store from './src/store'
import MinPlayer from './src/components/mini-player/mini-player'
import {utilWidth} from "./src/common/js/util";
import SplashScreen from 'react-native-splash-screen'
import Route from './src/components/route-wrapper/route-wrapper'


class Root extends React.PureComponent {
  componentDidMount() {
    // do anything while splash screen keeps, use await to wait for an async task.
    SplashScreen.hide();//关闭启动屏幕
  }

  render () {
    // console.log(store.getState('currentList').toJS(), store.getState('showPlayer').toJS())
    return (
      <Provider store={store}>
        <View style={{backgroundColor: '#222', height: '100%', position: 'relative', paddingBottom: store.getState('currentList').size > 0 && !store.getState('showPlayer') ? utilWidth(120) : 0}}>
          <Header/>
          <Route/>
          <Player/>
          <MinPlayer/>
        </View>
      </Provider>
    )
  }
}

export default Root
