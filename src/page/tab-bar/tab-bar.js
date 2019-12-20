import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
// import Home from '../home/home'
import Singer from '../singer/singer'
import Rank from '../rank/rank'
import Search from '../search/search'
import {utilWidth} from "../../common/js/util";

const TabBarCom = createMaterialTopTabNavigator({
  // Home: {
  //   screen: Home,
  //   navigationOptions: {
  //     tabBarLabel: "首页"
  //   }
  // },
  Singer: {
    screen: Singer,
    navigationOptions: {
      tabBarLabel: "歌手"
    }
  },
  Rank: {
    screen: Rank,
    navigationOptions: {
      tabBarLabel: "排行"
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: "搜索"
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#ffcd32',
    inactiveTintColor: 'hsla(0,0%,100%,.5)',
    style: {
      backgroundColor: '#222',
      height: utilWidth(100)
    },
    indicatorStyle: {
      backgroundColor: '#ffcd32'
    },
    labelStyle: {
      fontSize: utilWidth(28)
    }
  }
})

export default TabBarCom
