import React, {Component} from 'react';import { View, Image, StyleSheet, Platform, UIManager, TouchableWithoutFeedback } from 'react-native'import { flyGet } from '../../common/js/fetch'import { utilWidth } from '../../common/js/util'import {  SingerWrapper,  SingerItem,  TypeItem,  SingerName,  TypeList,  TypeText,  FixedTitle} from './style'export default class Singer extends Component {  constructor (props) {    super(props)    this.state = {      singerList: [],      heightArr: [],      activeIndex: 0,      fixedTop: 0    }    if (Platform.OS === 'android') {//android平台需要开启允许LayoutAnimation ios默认开启      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);    }    this.renderSinger = this.renderSinger.bind(this)    this._scroll = this._scroll.bind(this)    this.mathHeight = this.mathHeight.bind(this)  }  async componentDidMount () {    const res = await flyGet('https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1515065869&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&platform=yqq&jsonpCallback=__jp1')    let data = res.data.replace('__jp1(', '')    data = JSON.parse(data.slice(0, data.length - 2))    let arr = []    for (let i = 65; i < 91; i++) {      arr.push([])      data.data.list.forEach(item => {        if (item.Findex.charCodeAt(0) === i) {          arr[i - 65].push(item)        }      })    }    let initArr = []    arr.forEach(item => {      if (item.length > 0) {        initArr.push(item)      }    })    this.setState({      singerList: initArr    })    this.mathHeight()  }  mathHeight () {    let heightArr = []    this.state.singerList.forEach((item, index) => {      if (index === 0) {        heightArr.push({          max: (utilWidth(100) + utilWidth(40)) * item.length + utilWidth(40) + utilWidth(60),          min: 0        })      } else {        heightArr.push({          min: heightArr[index - 1].max,          max: heightArr[index - 1].max + (utilWidth(100) + utilWidth(40)) * item.length + utilWidth(40) + utilWidth(60)        })      }    })    this.setState({      heightArr: heightArr    })  }  renderSinger (list) {    const { navigation } = this.props    return (      <View>        {list.map(item => {          return (            <TouchableWithoutFeedback onPress={() => {              navigation.navigate('SongList', {type: 'singerSong', id: item.Fsinger_mid})            }} key={item.Fsinger_mid}>              <SingerItem>                <Image style={styles.avatar} source={{uri: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`}} />                <SingerName>{item.Fsinger_name}</SingerName>              </SingerItem>            </TouchableWithoutFeedback>          )        })}      </View>    )  }  _scroll (e) {    let y = e.nativeEvent.contentOffset.y    const { heightArr, activeIndex } = this.state    heightArr.forEach((item, index) => {      if (y >= item.min && y <item.max) {        this.setState({          activeIndex: index        })      }      if (y >= item.min - utilWidth(60) && y < item.min) {        this.setState({          fixedTop: -Math.ceil(y - (item.min - utilWidth(60)))        })      } else if (index === activeIndex + 1) {        this.setState({          fixedTop: 0        })      }    })  }  _scrollToIndex (index) {    this.scroll.scrollTo({      x: 0,      y: this.state.heightArr[index].min + 1,      animated: true    })  }  render() {    const {singerList, activeIndex, fixedTop} = this.state    return (      <View style={{position: 'relative', flex: 1}}>        <FixedTitle style={{position: 'absolute', top: fixedTop}}>{singerList.length > 0 ? singerList[activeIndex][0].Findex : ''}</FixedTitle>        <SingerWrapper onScroll={this._scroll} ref={(ref => {this.scroll = ref})}>          {singerList.map((item, index) => {            return (              <View key={index + 'asd'} style={{paddingBottom: utilWidth(40)}}>                {item.length > 0 ? <TypeItem>{item[0].Findex}</TypeItem> : null}                {this.renderSinger(item)}              </View>            )          })}        </SingerWrapper>        <TypeList>          {singerList.map((item, index) => (            <TypeText onPress={() => {this._scrollToIndex(index)}} style={{color: this.state.activeIndex === index ? '#ffcd32' : 'hsla(0,0%,100%,.5)'}} key={item[0].Findex}>{item[0].Findex}</TypeText>          ))}        </TypeList>      </View>    );  }}const styles = StyleSheet.create({  avatar: {    width: utilWidth(100),    height:utilWidth(100),    borderRadius: utilWidth(50),    marginRight: utilWidth(40)  }})