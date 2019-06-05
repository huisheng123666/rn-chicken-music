import * as constans from './constans'
import { fromJS } from 'immutable'
import { createUrl } from "../common/js/util";

const changePlayStatus = (status) => ({
  type: constans.CHANGE_PLAY_STATUS,
  status: fromJS(status)
})
export const changStatus = (status) => {
  return (dispatch) => {
    dispatch(changePlayStatus(status))
  }
}

export const changeList = (list) => {
  return (dispatch) => {
    dispatch({
      type: constans.CHANGE_CURRENT_LIST,
      list: fromJS(list)
    })
  }
}

export const changeSong = (song, index) => {
  return (dispatch) => {
    if (!song.musicurl) {
      createUrl(song.songmid).then(url => {
        song.musicurl = url
        console.log(url)
        console.log(url)
        dispatch({
          type: constans.CHANGE_CURRENT_SONG,
          song: fromJS(song),
          index: fromJS(index)
        })
      })
    } else {
      dispatch({
        type: constans.CHANGE_CURRENT_SONG,
        song: fromJS(song),
        index: fromJS(index)
      })
    }
  }
}

export const changePaused = (paused) => {
  return (dispatch) => {
    dispatch({
      type: constans.CHANGE_PAUSED,
      paused: fromJS(paused)
    })
  }
}

export const changePercent = (percent) => {
  return (dispatch) => {
    dispatch({
      type: constans.CHANGE_PERCENT,
      percent
    })
  }
}
