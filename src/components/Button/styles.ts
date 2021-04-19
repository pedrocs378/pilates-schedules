import styled from 'styled-components/native'

import { colors } from '../../styles/colors'

export const Container = styled.TouchableOpacity`
	border-radius: 8px;
	height: 50px;
	width: 46%;
	align-items: center;
	justify-content: center;
`

export const ButtonText = styled.Text`
	font-family: 'Poppins_600SemiBold';
	font-size: 16px;
	color: ${colors.white};
`