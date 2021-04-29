import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View`
	flex: 2;
	align-items: center;
	justify-content: center;
	background-color: rgba(230, 230, 230, 0.85);
`

export const ModalItem = styled.View`
	height: 300px;
	width: 90%;
	background-color: ${colors.white};
	border-radius: 8px;
	padding: 20px 15px;
`

export const CloseButton = styled.TouchableOpacity`
	align-self: flex-end;
`

export const SectionTitle = styled.Text`
	font-family: ${fonts.complement};
	font-size: 20px;
	color: ${colors.black};
`

export const ScheduleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
`