import styled from 'styled-components'
import { utilWidth } from '../../common/js/util'

export const BackLayer = styled.View`
  width: 100%;
  height: 100%;
`

export const SongName = styled.Text`
  font-size: ${utilWidth(36)};
  color: #fff;
  height: ${utilWidth(80)};
  padding-top: ${utilWidth(20)};
  text-align: center;
`

export const SingerName = styled.Text`
  font-size: ${utilWidth(28)};
  color: #fff;
  text-align: center;
  margin-bottom: ${utilWidth(50)};
`

export const PlayControl = styled.View`
  width: ${utilWidth(600)};
  position: absolute;
  left: ${utilWidth(75)};
  bottom: ${utilWidth(100)};
`

export const TimeWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Time = styled.Text`
  font-size: ${utilWidth(24)};
  color: #fff;
`

export const ControlButtonWrapper = styled.View`
  margin-top: ${utilWidth(40)};
  flex-direction: row;
  justify-content: space-between;
`
