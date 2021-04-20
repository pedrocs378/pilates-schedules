import React, { useCallback, useState } from 'react'
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'

import { Button } from '../Button'
import { InputTextLabel } from '../InputTextLabel'
import { InputSelectLabel } from '../InputSelectLabel'

import { colors } from '../../styles/colors'

import {
	Container,
	ModalItem,
	SectionTitle,
	SectionTitleContainer,
	NewScheduleButton,
	NewScheduleButtonText,
	InputsContainer,
	ButtonsContainer,
} from './styles'

interface Schedule {
	id: number
	dayOfWeek: string
	hour: string
}

interface RegisterStudentModalProps {
	isVisible: boolean
	onClose: () => void
}

const initialSchedules: Schedule[] = [
	{
		id: Math.random(),
		dayOfWeek: '',
		hour: ''
	}
]

export function RegisterStudentModal({ isVisible, onClose }: RegisterStudentModalProps) {
	const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules)
	const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('')

	const handleChangeSelectedDay = useCallback((value: string) => {
		setSelectedDayOfWeek(value)
	}, [])

	function handleCancelRegister() {
		setSchedules(initialSchedules)
		onClose()
	}

	function handleInsertNewSchedule() {
		setSchedules([...schedules, {
			id: Math.random(),
			dayOfWeek: '',
			hour: ''
		}])
	}

	return (
		<Modal
			animationType="fade"
			visible={isVisible}
			onRequestClose={onClose}
			transparent
		>
			<Container>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ModalItem>
						<SectionTitle style={{ marginBottom: 18 }}>Dados</SectionTitle>
						<InputTextLabel labelText="Nome" />
						<InputTextLabel labelText="Celular (Somente números)" />
						<SectionTitleContainer>
							<SectionTitle>Horários</SectionTitle>
							<NewScheduleButton onPress={handleInsertNewSchedule}>
								<NewScheduleButtonText>+  Novo horário</NewScheduleButtonText>
							</NewScheduleButton>
						</SectionTitleContainer>
						{schedules.map(schedule => {
							return (
								<InputsContainer key={schedule.id}>
									<InputSelectLabel
										style={{ width: '70%' }}
										labelText="Dia da semana"
									/>
									<InputTextLabel
										style={{ width: '27%', marginLeft: 'auto' }}
										labelText="Hora"
									/>
								</InputsContainer>
							)
						})}
						<ButtonsContainer>
							<Button color={colors.red} onPress={handleCancelRegister} activeOpacity={0.7}>
								Cancelar
							</Button>
							<Button color={colors.green} activeOpacity={0.7}>
								Salvar
							</Button>
						</ButtonsContainer>
					</ModalItem>
				</TouchableWithoutFeedback>
			</Container>
		</Modal>
	)
}