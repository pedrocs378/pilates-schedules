import React from 'react'
import { StyleProp, TextInputProps, ViewStyle } from 'react-native'

import { Container, Label, Input, } from './styles'

interface InputLabel extends TextInputProps {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputTextLabel({ labelText, style = {}, ...rest }: InputLabel) {

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<Input {...rest} />
		</Container>
	)
}