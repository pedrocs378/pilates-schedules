import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${colors.white};
`

export const Header = styled.View`
	background-color: ${colors.blue};
	height: 60px;
	padding: 0 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Title = styled.Text`
	font-family: ${fonts.heading};
	font-size: 18px;
	line-height: 24px;
	color: ${colors.white};
`

export const WithoutClassesMessageBox = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`

export const WithoutClassesMessageBoxText = styled.Text`
	font-family: ${fonts.heading};
	font-size: 15px;
	color: ${colors.gray400};
`
