import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 28px;
	position: relative;
	background-color: ${colors.white};
`

export const SearchContainer = styled.View`
	background-color: ${colors.shape};
	height: 40px;
	border-radius: 40px;
	flex-direction: row;
	align-items: center;
	padding: 0 15px;
	margin-bottom: 16px;
`

export const InputSearch = styled.TextInput`
	flex: 1;
	margin-left: 12px;
	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.black};
`

export const RegisterStudentButton = styled(RectButton)`
	position: absolute;
	bottom: 10px;
	right: 10px;
	background-color: ${colors.blue};
	height: 42px;
	width: 42px;
	border-radius: 21px;

	align-items: center;
	justify-content: center;
`
