import React, {Component} from 'react';import { View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'import { BannerWrap, Title, RecommendItem, RecommendItemName, RecommendItemContent } from './style'import Swiper from 'react-native-swiper'import {utilWidth} from "../../common/js/util";import { flyGet } from '../../common/js/fetch'const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1576846571746&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22MusicHallHomePage%22:{%22module%22:%22music.musicHall.MusicHallPlatform%22,%22method%22:%22MobileWebHome%22,%22param%22:{%22ShelfId%22:[101,102,161]}},%22hotkey%22:{%22module%22:%22tencent_musicsoso_hotkey.HotkeyService%22,%22method%22:%22GetHotkeyForQQMusicMobile%22,%22param%22:{%22remoteplace%22:%22txt.miniapp.wxada7aab80ba27074%22,%22searchid%22:%221559616839293%22}}}'export default class Home extends Component {  constructor (props) {    super(props)    this.state = {      slider: [],      recommend: []    }  }  async componentDidMount () {    let response = await flyGet(url, {}, {}, 'json')    console.log(response.data.MusicHallHomePage.data.v_shelf[0])    // response = JSON.parse(response.data)    // if (response.code === 0) {    //   this.setState({    //     slider: response.data.slider,    //     recommend: response.data.songList    //   })    // }  }  render() {    const { navigation } = this.props    return (      <ScrollView style={{flex: 1, backgroundColor: '#222'}}>        <BannerWrap>          {this.state.slider.length ? <Swiper            style={styles.swiper}            height={utilWidth(300)}            horizontal={true}            paginationStyle={{bottom: 10}}            showsButtons={false}>            {this.state.slider.map(item => {              return <TouchableWithoutFeedback onPress={() => {navigation.navigate('BannerDetail', {uri: item.linkUrl})}} key={item.id}>                <Image style={{height: '100%', width: '100%'}} source={{uri: item.picUrl}} />              </TouchableWithoutFeedback>            })}          </Swiper> : null}        </BannerWrap>        <Title>热门歌单推荐</Title>        {this.state.recommend.map(item => {          return (            <TouchableWithoutFeedback key={item.id} onPress={() => {              navigation.navigate('SongList', {id: item.id, type: 'songList'})            }}>              <RecommendItem>                <Image style={{width: utilWidth(140), height: utilWidth(160), marginRight: utilWidth(40)}} source={{uri: item.picUrl}} />                <View>                  <RecommendItemName>{item.songListAuthor}</RecommendItemName>                  <RecommendItemContent>{item.songListDesc}</RecommendItemContent>                </View>              </RecommendItem>            </TouchableWithoutFeedback>          )        })}      </ScrollView>    );  }}const styles = StyleSheet.create({  swiper: {    width: '100%'  }});