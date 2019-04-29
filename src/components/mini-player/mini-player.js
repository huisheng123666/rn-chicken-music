import React, {PureComponent} from 'react'import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native'import { Wrapper, SongDesc, SongName, SongSinger } from './style'import { connect } from 'react-redux'import * as actionCreators from '../../store/actionCreators'import { utilWidth } from '../../common/js/util'import { AnimatedCircularProgress } from 'react-native-circular-progress';import pausedImg from './paused.png'import playImg from './play.png'class MiniPlayer extends PureComponent {  render () {    const {currentList, showPlayer, currentSong, paused, changePaused, percent, changeStatus} = this.props    return (      <View>        {currentList.size > 0 && currentSong.get('musicurl') && !showPlayer ? <Wrapper>          <Image source={{uri: currentSong.get('image')}} style={styles.avatar} />          <TouchableOpacity onPress={() => {changeStatus(true)}}>            <SongDesc>              <SongName>{currentSong.get('songname')}</SongName>              <SongSinger>                {currentSong.get('singer').map(item => <Text key={item.get('id')}>{item.get('name')}</Text>)}              </SongSinger>            </SongDesc>          </TouchableOpacity>          <AnimatedCircularProgress            size={utilWidth(80)}            width={utilWidth(4)}            rotation={0}            tintColor={'#ffcd32'}            fill={parseInt(percent * 100)}            backgroundColor={'#ccc'}>            {(fill) => (              <TouchableOpacity onPress={() => {changePaused(!paused); console.log(123)}}>                <Image source={paused ? pausedImg : playImg} style={styles.paused} />              </TouchableOpacity>              )}          </AnimatedCircularProgress>        </Wrapper> : null}      </View>    )  }}const mapDispatch = (dispatch) => ({  changePaused (paused) {    dispatch(actionCreators.changePaused(paused))  },  changeStatus (status) {    dispatch(actionCreators.changStatus(status))  },})const mapState = (state) => ({  currentSong: state.getIn(['currentSong']),  currentList: state.getIn(['currentList']),  showPlayer: state.getIn(['showPlayer']),  paused: state.getIn(['paused']),  percent: state.getIn(['percent'])})const styles = StyleSheet.create({  avatar: {    width: utilWidth(80),    height: utilWidth(80),    borderRadius: utilWidth(40),    marginLeft: utilWidth(40)  },  paused: {    width: utilWidth(36),    height: utilWidth(36)  }})export default connect(mapState, mapDispatch)(MiniPlayer)