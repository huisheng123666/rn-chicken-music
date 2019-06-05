import React from 'react';
import {Animated, Easing, View} from 'react-native';
import {createStackNavigator} from "react-navigation";
import TabBar from "../../page/tab-bar/tab-bar";
import BannerDetail from "../../page/banner-detail/banner-detail";
import SongList from "../../page/song-list/song-list";
import {connect} from "react-redux";
import { utilWidth } from '../../common/js/util'

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

const RouteWrapper = ({currentList, showPlayer, currentSong}) => {
  return (
    <View style={{flex: 1, paddingBottom: currentList.size > 0 && currentSong.get('musicurl') && !showPlayer ? utilWidth(120) : 0}}>
      <Route/>
    </View>
  )
}

const mapState = (state) => ({
  currentSong: state.getIn(['currentSong']),
  currentList: state.getIn(['currentList']),
  showPlayer: state.getIn(['showPlayer']),
})

export default connect(mapState, null)(RouteWrapper)
