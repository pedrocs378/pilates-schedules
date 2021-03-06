import styled, { css } from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'

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

const inputCss = css`
	margin-top: 10px;
	background-color: ${colors.gray10};
	border: 1px solid ${colors.gray30};
	height: 50px;
	border-radius: 8px;
	padding: 0 20px;

	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.black};
`

export const Input = styled.TextInput`
	${inputCss}
`

export const InputMasked = styled(TextInputMask)`
	${inputCss}
`
