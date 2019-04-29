import React from 'react';
import { Provider } from 'react-redux'
import {View, Easing, Animated} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import BannerDetail from './src/page/banner-detail/banner-detail'
import SongList from './src/page/song-list/song-list'
import TabBar from './src/page/tab-bar/tab-bar'
import Header from './src/components/header/header'
import Player from './src/components/player/player'
import store from './src/store'
import MinPlayer from './src/components/mini-player/mini-player'
import {utilWidth} from "./src/common/js/util";
import SplashScreen from 'react-native-splash-screen'


const Route = createStackNavigator({
  TabBar: {
    screen: TabBar,
    navigationOptions: {
      header: null
    }
  },
  BannerDetail: {
    screen: BannerDetail,
    navigationOptions: {
      header: null
    }
  },
  SongList: {
    screen: SongList,
    navigationOptions: {
      header: null
    }
  }
}, {
  mode: 'card',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  })
})

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
