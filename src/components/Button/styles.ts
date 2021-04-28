import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.TouchableOpacity`
	flex: 1;
	border-radius: 8px;
	margin: 0 3px;
	height: 50px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

export const ButtonText = styled.Text`
	font-family: ${fonts.heading};
	font-size: 16px;
	color: ${colors.white};
`