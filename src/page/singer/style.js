import styled from 'styled-components'import { utilWidth } from '../../common/js/util'export const SingerWrapper = styled.ScrollView`  flex: 1;  background-color: #222;`export const TypeItem = styled.Text`  width: 100%;  height: ${utilWidth(60)};  padding-top: ${utilWidth(14)};  flex-direction: column;  justify-content: center;  background-color: #333;  padding-left: ${utilWidth(40)};  font-size: ${utilWidth(24)};  color: hsla(0,0%,100%,.5);`export const SingerItem = styled.View`  flex-direction: row;  padding-left: ${utilWidth(60)};  padding-top: ${utilWidth(40)};  align-items: center;`export const SingerName = styled.Text`  font-size: ${utilWidth(28)};  color: hsla(0,0%,100%,.5);`export const TypeList = styled.View`  width: ${utilWidth(40)};  position: absolute;  right: ${utilWidth(10)};  top: ${utilWidth(80)};  padding-top: ${utilWidth(20)};  padding-bottom: ${utilWidth(20)};  flex-direction: column;  align-items: center;  border-radius: ${utilWidth(20)};  background-color: rgba(0,0,0,.3);  z-index: 999999;`export const TypeText = styled.Text`  width: ${utilWidth(40)};  padding-top: ${utilWidth(5)};  padding-bottom: ${utilWidth(5)};  text-align: center;  font-size: ${utilWidth(24)};  color: hsla(0,0%,100%,.5);`export const FixedTitle = styled.Text`  width: 100%;  height: ${utilWidth(60)};  padding-top: ${utilWidth(14)};  flex-direction: column;  justify-content: center;  background-color: #333;  padding-left: ${utilWidth(40)};  font-size: ${utilWidth(24)};  color: #ffcd32;  position: absolute;  z-index: 9999;`