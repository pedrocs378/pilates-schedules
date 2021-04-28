import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled(RectButton)`
	flex-direction: row;
	margin-top: 11px;
`

export const ButtonRemove = styled(RectButton)`
	width: 90px;
	height: 85px;
	background-color: ${colors.red};
	margin-top: 15px;
	border-radius: 20px;
	justify-content: center;
	align-items: center;
	position: relative;
	right: 20px;
	padding-left: 10px;
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