import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 28px;
	position: relative;
`

export const InputContainer = styled.View`
	background-color: ${colors.white};
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
	font-family: 'Poppins_400Regular';
	font-size: 14px;
	color: ${colors.black};
`

export const StudentItem = styled.View`
	flex-direction: row;
	margin-top: 11px;
`

export const StudentInfo = styled.View`
	flex: 8;
	background-color: ${colors.white};
	justify-content: center;
	padding: 20px 0;
	padding-left: 15px;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
`

export const StudentName = styled.Text`
	font-family: 'Poppins_600SemiBold';
	font-size: 16px;
`

export const StudentPhone = styled.Text`
	font-family: 'Poppins_400Regular';
	font-size: 14px;
	color: ${colors.gray400};
`

export const StudentClassDays = styled.View`
	flex: 2;
	margin-left: 5px;
	background-color: ${colors.white};
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	padding: 2px 0;
`

export const DayOfWeek = styled.Text`
	text-align: center;
	font-family: 'Poppins_400Regular';
	font-size: 12px;
`

export const RegisterStudentButton = styled(RectButton)`
	position: absolute;
	bottom: 10px;
	right: 10px;
	background-color: ${colors.blue};
	height: 40px;
	width: 40px;
	border-radius: 20px;

	align-items: center;
	justify-content: center;
`
