import * as constans from './constans'
import { fromJS } from 'immutable'

// immutable将state变为不可改变的immutable对象
const defaultState = fromJS({
  paused: true,
  showPlayer: false,
  currentList: [],
  currentSong: {},
  currentIndex: 0,
  percent: 0
})


export default (state = defaultState, action) => {
  switch (action.type) {
    case constans.CHANGE_PLAY_STATUS:
      return state.set('showPlayer', action.status)
    case constans.CHANGE_CURRENT_LIST:
      return state.set('currentList', action.list)
    case constans.CHANGE_CURRENT_SONG:
      return state.merge({
        currentSong: action.song,
        currentIndex: action.index
      })
    case constans.CHANGE_PAUSED:
      return state.set('paused', action.paused)
    case constans.CHANGE_PERCENT:
      return state.set('percent', action.percent)
    default:
      return state
  }
}
