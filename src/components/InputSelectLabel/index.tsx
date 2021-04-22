import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PickerProps } from '@react-native-picker/picker/typings/Picker'

import { colors } from '../../styles/colors'

import { Container, Label, PickerWrapper } from './styles'
import { useDaysOfWeek } from '../../contexts/daysOfWeek'

interface InputSelectLabel extends PickerProps {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputSelectLabel({ labelText, style = {}, ...rest }: InputSelectLabel) {
	const daysOfWeek = useDaysOfWeek()

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<PickerWrapper>
				<Picker
					mode="dropdown"
					style={{ backgroundColor: 'transparent' }}
					{...rest}
				>
					<Picker.Item label="Selecione o dia" value={-1} color={colors.gray400} />

					{daysOfWeek.map(day => {
						return (
							<Picker.Item key={day.id} label={day.dayWeek} value={day.numberWeek} color={colors.black} />
						)
					})}
				</Picker>
			</PickerWrapper>
		</Container>
	)
}