import styled from 'styled-components'import { utilWidth } from '../../common/js/util'export const RankWrapper = styled.ScrollView`  flex: 1;  background-color: #222;`export const RankItem = styled.View`  width: ${utilWidth(670)};  margin-top: ${utilWidth(40)};  background-color: #333;  flex-direction: row;`export const SongList = styled.View`  flex-direction: column;  justify-content: space-between;  height: ${utilWidth(200)};  padding-top: ${utilWidth(20)};  padding-bottom: ${utilWidth(20)};`export const SongItem = styled.Text`  font-size: ${utilWidth(24)};  color: hsla(0,0%,100%,.3);`