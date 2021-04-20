import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled(SafeAreaView)`
	flex: 1;
	margin: 0;
	padding: 0;
`

export const Header = styled.View`
	background-color: ${colors.blue};
	height: 60px;
	padding: 0 20px;
	flex-direction: row;
	align-items: center;
`

export const Title = styled.Text`
	font-family: ${fonts.heading};
	font-size: 18px;
	margin: 0 auto;
	color: ${colors.white};
`

export const Content = styled.ScrollView`
	flex: 1;
`

export const Class = styled(RectButton)`
	flex-direction: row;
	margin: 20px 20px 0;
	padding: 0 5px;
`

export const Time = styled.Text`
	font-family: ${fonts.complement};
	font-size: 16px;
	color: ${colors.yellow};
	align-self: center;
	margin-right: 20px;
`

export const ClassStudents = styled.View`
	flex: 1;
	background-color: ${colors.white};
	border-radius: 8px;
	padding: 25px 18px 5px;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`

export const Student = styled.Text`
	font-family: ${fonts.complement};
	font-size: 14px;
	color: ${colors.black};
	flex-basis: 45%;
	margin-bottom: 20px;
`
