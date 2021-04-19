import styled from 'styled-components/native'

import { colors } from '../../styles/colors'

export const Container = styled.View`
	margin-bottom: 8px;
`

export const Label = styled.Text`
	font-family: 'Poppins_400Regular';
	font-size: 14px;
	color: ${colors.gray400};
`

export const Input = styled.TextInput`
	margin-top: 10px;
	background-color: ${colors.gray10};
	border: 1px solid ${colors.gray30};
	height: 50px;
	border-radius: 8px;
	padding: 0 20px;

	font-family: 'Poppins_400Regular';
	font-size: 14px;
	color: ${colors.black};
`
