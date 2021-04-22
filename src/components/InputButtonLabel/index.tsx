import React from 'react'
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'

import { Container, Label, Button, ButtonText } from './styles'

interface InputButtonLabelProps extends TouchableOpacityProps {
	labelText: string
	value: string
	style?: StyleProp<ViewStyle>
}

export function InputButtonLabel({ labelText, value, style = {}, ...rest }: InputButtonLabelProps) {

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<Button activeOpacity={0.5} {...rest}>
				<ButtonText>{value}</ButtonText>
			</Button>
		</Container>
	)
}