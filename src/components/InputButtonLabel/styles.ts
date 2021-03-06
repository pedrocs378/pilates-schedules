import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View`
	margin-bottom: 16px;
`

export const Label = styled.Text`
	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.gray400};
`

export const Button = styled.TouchableOpacity`
	margin-top: 10px;
	background-color: ${colors.gray10};
	border: 1px solid ${colors.gray30};
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`

export const ButtonText = styled.Text`
	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.black};
`
