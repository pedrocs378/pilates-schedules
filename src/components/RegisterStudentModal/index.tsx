import React, { useCallback, useState } from 'react'
import { Keyboard, Modal, ToastAndroid, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format, setWeek } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Button } from '../Button'
import { InputTextLabel } from '../InputTextLabel'
import { InputSelectLabel } from '../InputSelectLabel'
import { InputTextLabelMasked } from '../InputTextLabel/InputTextLabelMasked'
import { InputButtonLabel } from '../InputButtonLabel'

import { useStudents } from '../../contexts/students'

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

interface ScheduleProps {
	id: number
	dayOfWeek: {
		numberWeek: number
		dayWeek: string
	}
	time: Date
}

interface ShowScheduleCalendar {
	[id: number]: boolean
}

interface RegisterStudentModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit: () => void
}

const daysOfWeek = {
	[-1]: '',
	[1]: 'Segunda-feira',
	[2]: 'Terça-feira',
	[3]: 'Quarta-feira',
	[4]: 'Quinta-feira',
} as {
	[key: number]: string
}

const initialScheduleId = Math.random()

const initialSchedules: ScheduleProps[] = [
	{
		id: initialScheduleId,
		dayOfWeek: {
			numberWeek: -1,
			dayWeek: ''
		},
		time: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0)
	}
]

const initialScheduleCalendar = {
	[initialScheduleId]: false
}

export function RegisterStudentModal({ isVisible, onClose, onSubmit }: RegisterStudentModalProps) {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [schedules, setSchedules] = useState<ScheduleProps[]>(initialSchedules)
	const [showCalendar, setShowCalendar] = useState<ShowScheduleCalendar>(initialScheduleCalendar)

	const { publishStudent } = useStudents()

	async function handleSubmit() {
		try {
			await publishStudent({
				name,
				phone,
				schedules
			})

			ToastAndroid.show('Aluno cadastrado realizado com sucesso', ToastAndroid.LONG)
			onSubmit()
			closeModal()
		} catch (err) {
			ToastAndroid.show('Erro ao cadastrar aluno', ToastAndroid.LONG)
		}
	}

	function closeModal() {
		setSchedules(initialSchedules)
		setName('')
		setPhone('')
		onClose()
	}

	function handleInsertNewSchedule() {
		setSchedules([...schedules, {
			id: Math.random(),
			dayOfWeek: {
				numberWeek: -1,
				dayWeek: ''
			},
			time: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0)
		}])
	}

	function handleChangePhone(text: string) {
		setPhone(text)
	}

	const handleRemoveSchedule = useCallback((id: number) => {
		if (schedules.length === 1) {
			setSchedules(initialSchedules)

			return
		}
		const newSchedules = schedules.filter(schedule => schedule.id !== id)

		setSchedules(newSchedules)
	}, [schedules])

	const handleOpenDateTimePicker = useCallback((id: number) => {
		setShowCalendar({
			...showCalendar,
			[id]: true
		})
	}, [])

	const handleChangeTime = useCallback((id: number, time: Date | undefined) => {
		setShowCalendar({
			...showCalendar,
			[id]: false
		})

		if (time) {
			const schedulesEdited = schedules.map(schedule => {
				if (schedule.id === id) {
					return {
						...schedule,
						time
					}
				}

				return schedule
			})

			setSchedules(schedulesEdited)
		}
	}, [schedules])

	const handleChangeDayOfWeek = useCallback((id: number, value: number) => {
		const schedulesEdited = schedules.map(schedule => {
			if (schedule.id === id) {
				return {
					...schedule,
					dayOfWeek: {
						numberWeek: value,
						dayWeek: daysOfWeek[value]
					}
				}
			}

			return schedule
		})

		setSchedules(schedulesEdited)
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
					<ModalItem showsVerticalScrollIndicator={false}>
						<SectionTitle style={{ marginBottom: 18 }}>Dados</SectionTitle>
						<InputTextLabel
							labelText="Nome"
							value={name}
							onChangeText={text => setName(text)}
							autoCapitalize="words"
							selectTextOnFocus
						/>
						<InputTextLabelMasked
							type="cel-phone"
							labelText="Celular (Somente números)"
							selectTextOnFocus
							keyboardType="phone-pad"
							placeholder="(18) 9xxxx-xxxx"
							value={phone}
							onChangeText={handleChangePhone}
						/>
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
											onValueChange={(value) => handleChangeDayOfWeek(schedule.id, Number(value))}
											selectedValue={schedule.dayOfWeek.numberWeek}
										/>
										<InputButtonLabel
											style={{ width: '27%', marginLeft: 'auto' }}
											labelText="Hora"
											value={format(schedule.time, 'HH:mm', { locale: ptBR })}
											onPress={() => handleOpenDateTimePicker(schedule.id)}
										/>

										{showCalendar[schedule.id] && (
											<DateTimePicker
												value={schedule.time}
												mode="time"
												display="default"
												onChange={(_, selectedDate) => handleChangeTime(schedule.id, selectedDate)}
											/>
										)}
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
							<Button color={colors.red} onPress={closeModal} activeOpacity={0.7}>
								Cancelar
							</Button>
							<Button color={colors.green} onPress={handleSubmit} activeOpacity={0.7}>
								Salvar
							</Button>
						</ButtonsContainer>
					</ModalItem>
				</TouchableWithoutFeedback>
			</Container>
		</Modal>
	)
}