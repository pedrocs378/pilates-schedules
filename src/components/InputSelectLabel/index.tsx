import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PickerProps } from '@react-native-picker/picker/typings/Picker'

import { Container, Label, PickerWrapper } from './styles'

import { colors } from '../../styles/colors'

interface InputSelectLabel extends PickerProps {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputSelectLabel({ labelText, style = {}, ...rest }: InputSelectLabel) {

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<PickerWrapper>
				<Picker
					mode="dropdown"
					style={{ backgroundColor: 'transparent' }}
					{...rest}
				>
					<Picker.Item label="Selecione o dia" value="" color={colors.gray400} />
					<Picker.Item label="Segunda-feira" value="Segunda-feira" color={colors.black} />
					<Picker.Item label="Terça-feira" value="Terça-feira" color={colors.black} />
					<Picker.Item label="Quarta-feira" value="Quarta-feira" color={colors.black} />
					<Picker.Item label="Quinta-feira" value="Quinta-feira" color={colors.black} />
				</Picker>
			</PickerWrapper>
		</Container>
	)
}