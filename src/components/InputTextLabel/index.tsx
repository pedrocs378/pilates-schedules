import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Container, Label, Input, } from './styles'

interface InputLabel {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputTextLabel({ labelText, style = {} }: InputLabel) {

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<Input />
		</Container>
	)
}