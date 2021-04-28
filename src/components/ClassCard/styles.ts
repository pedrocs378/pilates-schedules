import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.TouchableOpacity`
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
	background-color: ${colors.shape};
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