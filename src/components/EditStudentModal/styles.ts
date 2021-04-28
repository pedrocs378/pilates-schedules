import styled from 'styled-components/native'
import { ScrollView } from 'react-native-gesture-handler'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View`
	flex: 2;
	align-items: center;
	justify-content: center;
	background-color: rgba(230, 230, 230, 0.85);
`

export const ModalItem = styled(ScrollView)`
	width: 90%;
	background-color: ${colors.white};
	border-radius: 8px;
	padding: 0 15px;
	margin: 20px 0;
`

export const CloseButton = styled.TouchableOpacity`
	margin-top: 15px;
	align-self: flex-end;
`

export const SectionTitle = styled.Text`
	font-family: ${fonts.complement};
	font-size: 20px;
	color: ${colors.black};
`

export const SectionTitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 25px 0;
`

export const NewScheduleButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`

export const NewScheduleButtonText = styled.Text`
	margin-left: 8px;
	line-height: 26px;
	color: ${colors.blue};
	font-family: ${fonts.heading};
	font-size: 14px;
`

export const Schedule = styled.View`
	margin-bottom: 10px;
`

export const InputsContainer = styled.View`
	flex-direction: row;
	align-items: center;
`

export const DeleteScheduleContainer = styled.View`
	flex-direction: row;
	width: 100%;
	align-items: center;
	margin-top: 10px;
`

export const Separator = styled.View`
	height: 1px;
	width: 30%;
	background-color: ${colors.gray30};
`

export const DeleteScheduleButton = styled.TouchableOpacity`
	margin: 0 auto;
`

export const DeleteScheduleButtonText = styled.Text`
	color: ${colors.red};
	font-family: ${fonts.heading};
	font-size: 14px;
`

export const ButtonsContainer = styled.View`
	margin: 10px 0 25px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`