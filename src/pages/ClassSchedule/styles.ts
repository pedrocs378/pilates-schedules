import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

interface StudentProps {
	isLast?: boolean
}

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${colors.white};
`

export const Header = styled.View`
	flex-direction: row;
	background-color: ${colors.blue};
	height: 70px;
	align-items: center;
	padding: 0 20px;
`

export const HeaderTitle = styled.Text`
	margin: 0 auto;
	font-family: ${fonts.heading};
	color: ${colors.white};
	font-size: 18px;
`

export const Content = styled.View`
	flex: 1;
	padding: 28px;
	align-items: center;
	justify-content: center;
`

export const ClassStudentsCard = styled.View`
	background-color: ${colors.shape};
	width: 100%;
	padding: 10px 25px 0;
	border-radius: 8px;
`

export const StudentItem = styled.View<StudentProps>`
	${({ isLast }) => !isLast && css`
		border-bottom-width: 1px;
	`}
	border-color: ${colors.gray30};
	padding-bottom: 14px;
	margin-bottom: 14px;
`

export const StudentName = styled.Text`
	font-family: ${fonts.heading};
	font-size: 16px;
	color: ${colors.black};
`

export const StudentAbsenceControlContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 6px;
`

export const AbsenceControl = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`

export const AbsenceControlText = styled.Text`
	color: ${colors.gray400};
	font-family: ${fonts.text};
	font-size: 12px;
`

export const RescheduleButton = styled.TouchableOpacity`
	height: 40px;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: ${colors.blue};
	border-radius: 5px;
	margin-top: 10px;
`

export const RescheduleButtonText = styled.Text`
	font-family: ${fonts.heading};
	font-size: 14px;
	color: ${colors.white};
`

