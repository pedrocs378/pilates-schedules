import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View`
	flex: 2;
	align-items: center;
	justify-content: center;
	background-color: rgba(230, 230, 230, 0.85);
`

export const ModalItem = styled.View`
	width: 90%;
	background-color: ${colors.white};
	border-radius: 8px;
	padding: 25px 15px;
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
	margin: 18px 0;
`

export const NewScheduleButton = styled(RectButton)`
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

export const InputsContainer = styled.View`
	flex-direction: row;
	align-items: center;
`

export const ButtonsContainer = styled.View`
	margin-top: 38px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`