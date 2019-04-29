import styled from 'styled-components'import { utilWidth } from '../../common/js/util'export const BannerWrap = styled.View`  width: 100%;  height: ${utilWidth(300)};`export const Title = styled.Text`  font-size: ${utilWidth(28)};  color: #ffcd32;  text-align: center;  margin-top: ${utilWidth(36)};  margin-bottom: ${utilWidth(36)};`export const RecommendItem = styled.View`  flex-direction: row;  padding-left: ${utilWidth(20)};  padding-right: ${utilWidth(20)};  padding-bottom: ${utilWidth(20)};`export const RecommendItemName = styled.Text`  margin-top: ${utilWidth(20)};  margin-bottom: ${utilWidth(20)};  font-size: ${utilWidth(28)};  color: #fff;`export const RecommendItemContent = styled.Text`  font-size: ${utilWidth(28)};  color: hsla(0,0%,100%,.3);`