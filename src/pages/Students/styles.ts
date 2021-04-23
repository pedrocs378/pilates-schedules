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

export const InputContainer = styled.View`
	background-color: ${colors.shape};
	height: 40px;
	border-radius: 40px;
	flex-direction: row;
	align-items: center;
	padding: 0 15px;
	margin-bottom: 16px;
`

export const Input = styled.TextInput`
	flex: 1;
	margin-left: 12px;
	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.black};
`

export const StudentItem = styled.View`
	flex-direction: row;
	margin-top: 11px;
`

export const StudentInfo = styled.View`
	flex: 8;
	background-color: ${colors.shape};
	justify-content: center;
	padding: 20px 0;
	padding-left: 15px;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
`

export const StudentName = styled.Text`
	font-family: ${fonts.heading};
	font-size: 16px;
`

export const StudentPhoneContainer = styled.View`
	flex-direction: row;
	align-items: center;
`

export const StudentPhone = styled.Text`
	font-family: ${fonts.text};
	font-size: 14px;
	line-height: 20px;
	margin-left: 5px;
	color: ${colors.greenWhatsapp};
`

export const StudentClassDays = styled.View`
	flex: 2;
	margin-left: 5px;
	background-color: ${colors.shape};
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	padding: 2px 0;
`

export const DayOfWeek = styled.Text`
	text-align: center;
	font-family: ${fonts.text};
	font-size: 12px;
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
