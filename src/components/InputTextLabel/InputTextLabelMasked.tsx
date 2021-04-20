import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { TextInputMaskProps } from 'react-native-masked-text'

import { Container, Label, InputMasked } from './styles'

interface InputLabel extends TextInputMaskProps {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputTextLabelMasked({ labelText, style = {}, ...rest }: InputLabel) {

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<InputMasked {...rest} />
		</Container>
	)
}