import React, { useCallback, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { Container, Label, PickerWrapper } from './styles'

import { colors } from '../../styles/colors'

interface InputLabel {
	labelText: string
	style?: StyleProp<ViewStyle>
}

export function InputSelectLabel({ labelText, style = {} }: InputLabel) {
	const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('')

	const handleChangeSelectedDay = useCallback((value: string) => {
		setSelectedDayOfWeek(value)
	}, [])

	return (
		<Container style={style}>
			<Label>{labelText}</Label>
			<PickerWrapper>
				<Picker
					mode="dropdown"
					selectedValue={selectedDayOfWeek}
					onValueChange={handleChangeSelectedDay}
					style={{ backgroundColor: 'transparent' }}
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