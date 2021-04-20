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
	Schedule,
	InputsContainer,
	DeleteScheduleContainer,
	Separator,
	DeleteScheduleButton,
	DeleteScheduleButtonText,
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

	const handleRemoveSchedule = useCallback((id: number) => {
		if (schedules.length === 1) {
			setSchedules(initialSchedules)

			return
		}
		const newSchedules = schedules.filter(schedule => schedule.id !== id)

		setSchedules(newSchedules)
	}, [schedules])

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
								<Schedule key={schedule.id}>
									<InputsContainer>
										<InputSelectLabel
											style={{ width: '70%' }}
											labelText="Dia da semana"
										/>
										<InputTextLabel
											style={{ width: '27%', marginLeft: 'auto' }}
											labelText="Hora"
										/>
									</InputsContainer>
									<DeleteScheduleContainer>
										<Separator />

										<DeleteScheduleButton onPress={() => handleRemoveSchedule(schedule.id)}>
											<DeleteScheduleButtonText>Excluir horário</DeleteScheduleButtonText>
										</DeleteScheduleButton>

										<Separator />
									</DeleteScheduleContainer>
								</Schedule>
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