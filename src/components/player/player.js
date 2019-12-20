import React from 'react'
import {Animated, Easing, View, AppState, Image, StyleSheet, TouchableOpacity, Slider, LayoutAnimation, UIManager, Platform, BackHandler} from 'react-native'
import { connect } from 'react-redux'
import  Video from 'react-native-video'
import store from '../../store'
import {
  SongName,
  SingerName,
  PlayControl,
  TimeWrapper,
  Time,
  ControlButtonWrapper
} from './style'
import {utilWidth} from "../../common/js/util";
import * as actionCreators from "../../store/actionCreators";
import cycleImg from './cycle.png'
import cycleOneImg from './cycle-one.png'
import randomImg from './random.png'
import playImg from './play.png'
import pausedImg from './paused.png'
import {set} from "immutable";
let timer = null

class Player extends React.PureComponent {
  constructor (props) {
    super(props)

    if (Platform.OS === 'android') {//android平台需要开启允许LayoutAnimation ios默认开启
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      rotate: '0deg',
      height: 0,
      width: 0,
      playType: [cycleImg, randomImg, cycleOneImg],
      currentType: 0,
      percent: 0,
      playTime: '0:00',
      showVideo: true,
      rotateVal: new Animated.Value(0)
    }

    this.onBackAndroid = this.onBackAndroid.bind(this)
    this.randomPlay = this.randomPlay.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.videoEnd = this.videoEnd.bind(this)
    this.onSlidingComplete = this.onSlidingComplete.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.toTimer) {clearTimeout(this.toTimer)}
    this.toTimer = setTimeout(() => {
      this.togglePlayer()
    }, 100)
  }

  togglePlayer () {
    const {showPlayer, paused} = this.props
    LayoutAnimation.configureNext({
      duration: 300,   //持续时间
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: 'scaleX',
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: 'scaleX',
      }
    });
    this.setState({
      width: showPlayer ? '100%' : 0,
      height: showPlayer ? '100%' : 0,
    }, () => {
      setTimeout(() => {
        if (paused) return
        this.animated()
      }, 100)
    });
  }

  onBackAndroid () {
    this.props.changeStatus(false)
  }

  animated () {
    const { currentSong } = this.props
    Animated.timing(
      this.state.rotateVal,
      {
        toValue: 1,
        duration: currentSong.toJS().interval * 1000,
        easing: Easing.linear
      }
    ).start()
  }

  playNext () {
    this.state.rotateVal.setValue(0)
    const {currentIndex, currentList, changeSong} = this.props
    switch (this.state.currentType) {
      case 0:
        let song = null
        let index = null
        if (currentIndex === currentList.size - 1) {
          song = currentList.get(0).toJS()
          index = 0
        } else {
          song = currentList.get(currentIndex + 1).toJS()
          index = currentIndex + 1
        }
        changeSong(song, index)
        break
      case 1:
        this.randomPlay()
        break
      case 2:
        this.cycleOne()
        break
      default:
        break
    }
  }

  playPrev () {
    this.state.rotateVal.setValue(0)
    const {currentIndex, currentList, changeSong} = this.props
    switch (this.state.currentType) {
      case 0:
        let song = null
        let index = null
        if (currentIndex === 0) {
          song = currentList.get(currentList.size - 1).toJS()
          index = currentList.size - 1
        } else {
          song = currentList.get(currentIndex - 1).toJS()
          index = currentIndex - 1
        }
        changeSong(song, index)
        break
      case 1:
        this.randomPlay()
        break
      case 2:
        this.cycleOne()
        break
      default:
        break
    }
  }

  randomPlay () {
    const {currentIndex, currentList, changeSong} = this.props
    let index = Math.ceil(Math.random() * currentList.size)
    if (currentIndex === index) {
      index = Math.ceil(Math.random() * currentIndex)
    }
    changeSong(currentList.get(index).toJSON(), index)
  }

  cycleOne () {
    this.refs.video.seek(0)
  }

  changePlayType () {
    if (this.state.currentType >= 2) {
      this.setState({
        currentType: 0
      })
      return
    }
    this.setState((prevState) => {
      let type = prevState.currentType
      type++
      return {
        currentType: type
      }
    })
  }

  onProgress (e) {
    let per = (e.currentTime / e.seekableDuration)
    this.props.changePercent(per)
    let playTime = e.currentTime > 60 ? parseInt(e.currentTime / 60, 10) + ':' + (parseInt(e.currentTime) % 60 >= 10 ? parseInt(e.currentTime) % 60 : '0' + parseInt(e.currentTime) % 60) : '0' + ':' + (parseInt(e.currentTime, 10) >= 10 ? parseInt(e.currentTime, 10) : '0' + parseInt(e.currentTime, 10))
    this.setState({
      percent: per,
      playTime
    })
  }

  videoEnd () {
    switch (this.state.currentType) {
      case 0:
        this.playNext()
        break
      case 1:
        this.randomPlay()
        break
      case 2:
        this.cycleOne()
        break
      default:
        break
    }
  }

  onSlidingComplete (e) {
    const {currentSong} = this.props
    this.refs.video.seek(e * currentSong.get('interval'))
  }

  changePausedMusic () {
    const {paused, changePaused} = this.props
    if (paused) {
      this.animated()
    } else {
      Animated.timing(
        this.state.rotateVal
      ).stop()
    }
    changePaused(!paused)
  }

  render () {
    const {paused, currentSong} = this.props
    let singer = []
    let time = ''
    if (currentSong.get('singer')) {
      singer = currentSong.toJSON().singer
      // console.log(currentSong.toJS())
      time = parseInt(currentSong.get('interval') / 60) + ':' + (currentSong.get('interval') % 60 >= 10 ? currentSong.get('interval') % 60 : '0' + currentSong.get('interval') % 60)
    }
    let deg = currentSong.toJS().interval ? currentSong.toJS().interval / 20 * 360 + 'deg' : null
    const { height, width } = this.state
    return (
      <View style={{height: height, width: width, backgroundColor: '#222', position: 'absolute', left: 0, bottom: 0, overflow: 'hidden'}}>
        <TouchableOpacity style={styles.drop} onPress={() => {this.onBackAndroid()}}>
          <Image style={styles.dropImg} source={require('./drop.png')} />
        </TouchableOpacity>
        <SongName>{currentSong.get('songname') ? currentSong.get('songname') : ''}</SongName>
        {singer.map(item => {
          return (
            <SingerName key={item.get('id')}>{item.get('name')}</SingerName>
          )
        })}
        {deg ? <Animated.Image style={[styles.cd, {transform: [{rotateZ: this.state.rotateVal.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', deg],
            })}]}]}
            source={{uri: currentSong.get('image') ? currentSong.get('image') : '123'}} /> : null}
        <PlayControl>
          <TimeWrapper>
            <Time>{this.state.playTime}</Time>
            <Slider style={styles.slider}
                    minimumTrackTintColor={'#ffcd32'}
                    thumbTintColor="#ffcd32"
                    value={this.state.percent}
                    onSlidingComplete={this.onSlidingComplete}
                    maximumTrackTintColor={'rgba(255,255,255,.3)'}/>
            <Time>{time}</Time>
          </TimeWrapper>
          <ControlButtonWrapper>
            <TouchableOpacity onPress={() => {this.changePlayType()}}>
              <Image style={styles.Btn} source={this.state.playType[this.state.currentType]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.playPrev()}}>
              <Image style={styles.Btn} source={require('./prev.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.changePausedMusic()}}>
              <Image style={styles.Btn} source={paused ? pausedImg : playImg} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.playNext()}}>
              <Image style={styles.Btn} source={require('./next.png')} />
            </TouchableOpacity>
            <Image style={styles.Btn} source={require('./heart.png')} />
          </ControlButtonWrapper>
        </PlayControl>

        {currentSong.get('musicurl') ?
          <Video source={{uri: currentSong.get('musicurl')}}
            ref="video"
            paused={paused}
            progressUpdateInterval={500}
            playInBackground={true}
            onProgress={this.onProgress}
            onEnd={this.videoEnd} /> : null
        }
        <Image style={styles.bgImg}
               blurRadius={2}
               source={{uri: currentSong.get('image') ? currentSong.get('image') : '123'}} />
        <Image source={require('./mohu.png')} style={styles.bgImg} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1
  },
  cd: {
    width: utilWidth(600),
    height: utilWidth(600),
    borderWidth: utilWidth(20),
    borderColor: 'hsla(0,0%,100%,.1)',
    zIndex: 9,
    borderRadius: utilWidth(300),
    marginLeft: utilWidth(75)
  },
  slider: {
    width: utilWidth(530)
  },
  Btn: {
    width: utilWidth(60),
    height: utilWidth(60)
  },
  dropImg: {
    width: utilWidth(40),
    height: utilWidth(40)
  },
  drop: {
    width: utilWidth(60),
    height: utilWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: utilWidth(20),
    left: utilWidth(20),
    zIndex: 999
  }
})

const mapDispatch = (dispatch) => ({
  changeStatus (status) {
    dispatch(actionCreators.changStatus(status))
  },
  changeSong (song, index) {
    dispatch(actionCreators.changeSong(song, index))
  },
  changePaused (paused) {
    dispatch(actionCreators.changePaused(paused))
  },
  changePercent (percent) {
    dispatch(actionCreators.changePercent(percent))
  }
})

const mapState = (state) => ({
  showPlayer: state.getIn(['showPlayer']),
  paused: state.getIn(['paused']),
  currentList: state.getIn(['currentList']),
  currentSong: state.getIn(['currentSong']),
  currentIndex: state.getIn(['currentIndex'])
})


export default connect(mapState, mapDispatch)(Player)
