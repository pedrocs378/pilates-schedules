import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View``

export const Label = styled.Text`
	font-family: ${fonts.text};
	font-size: 14px;
	color: ${colors.gray400};
	margin-bottom: 10px;
`

export const PickerWrapper = styled.View`
	background-color: ${colors.gray10};
	border: 1px solid ${colors.gray30};
	border-radius: 8px;
	height: 50px;
	overflow: hidden;
`