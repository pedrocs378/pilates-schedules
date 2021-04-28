import React, { useCallback, useMemo, useState } from 'react'
import { Keyboard, Modal, ToastAndroid, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import * as Linking from 'expo-linking'

import { Button } from '../Button'
import { InputTextLabel } from '../InputTextLabel'
import { InputSelectLabel } from '../InputSelectLabel'
import { InputTextLabelMasked } from '../InputTextLabel/InputTextLabelMasked'
import { InputButtonLabel } from '../InputButtonLabel'

import { useStudents, Student } from '../../contexts/students'

import { colors } from '../../styles/colors'

import {
	Container,
	ModalItem,
	CloseButton,
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
	id: string
	dayOfWeek: {
		numberWeek: number
		dayWeek: string
	}
	time: Date
}

interface ShowScheduleCalendar {
	[id: string]: boolean
}

interface EditStudentModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit?: () => void
	data: Student
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

const initialScheduleId = String(Math.random())

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

export function EditStudentModal({ isVisible, data, onClose, onSubmit }: EditStudentModalProps) {
	const [editStudent, setEditStudent] = useState(false)
	const [name, setName] = useState(data.name)
	const [phone, setPhone] = useState(data.phone)
	const [schedules, setSchedules] = useState<ScheduleProps[]>(() => {
		if (data.schedules) {
			return data.schedules.map(schedule => {
				return {
					...schedule,
					time: new Date(schedule.time)
				}
			})
		}

		return []
	})
	const [showCalendar, setShowCalendar] = useState<ShowScheduleCalendar>(initialScheduleCalendar)

	const { publishStudent } = useStudents()

	async function handleSubmit() {
		try {

			ToastAndroid.show('Aluno cadastrado com sucesso', ToastAndroid.LONG)
			onSubmit && onSubmit()
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

	function handleCancelEditing() {
		setEditStudent(false)
	}

	function handleInsertNewSchedule() {
		setSchedules([...schedules, {
			id: String(Math.random()),
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

	function handleSendWhatsappMessage() {
		Linking.openURL(`whatsapp://send?phone=+55${data.phone}`)
	}

	const handleRemoveSchedule = useCallback((id: string) => {
		if (schedules.length === 1) {
			setSchedules(initialSchedules)

			return
		}
		const newSchedules = schedules.filter(schedule => schedule.id !== id)

		setSchedules(newSchedules)
	}, [schedules])

	const handleOpenDateTimePicker = useCallback((id: string) => {
		setShowCalendar({
			...showCalendar,
			[id]: true
		})
	}, [])

	const handleChangeTime = useCallback((id: string, time: Date | undefined) => {
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

	const handleChangeDayOfWeek = useCallback((id: string, value: number) => {
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

	const schedulesFormated = useMemo(() => {
		if (!data.schedules) {
			return []
		}

		return data.schedules.map(schedule => {
			return {
				...schedule,
				time: format(new Date(schedule.time), 'HH:mm', { locale: ptBR })
			}
		})
	}, [data.schedules])

	if (!data.schedules) {
		return null
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
					<ModalItem showsVerticalScrollIndicator={false}>
						<CloseButton onPress={onClose} activeOpacity={0.2}>
							<FeatherIcon name="x" size={28} color={colors.gray300} />
						</CloseButton>
						<SectionTitle style={{ marginBottom: 25 }}>Dados</SectionTitle>
						<InputTextLabel
							labelText="Nome"
							selectTextOnFocus
							autoCapitalize="words"
							editable={editStudent}
							value={data.name}
							onChangeText={text => setName(text)}
						/>
						<InputTextLabelMasked
							labelText="Celular (Somente números)"
							type="cel-phone"
							selectTextOnFocus
							keyboardType="phone-pad"
							placeholder="(18) 9xxxx-xxxx"
							editable={editStudent}
							value={data.phone}
							onChangeText={handleChangePhone}
						/>
						<SectionTitleContainer>
							<SectionTitle>Horários</SectionTitle>
							{editStudent && (
								<NewScheduleButton onPress={handleInsertNewSchedule}>
									<NewScheduleButtonText>+  Novo horário</NewScheduleButtonText>
								</NewScheduleButton>
							)}
						</SectionTitleContainer>
						{schedulesFormated.map(schedule => {
							return (
								<Schedule key={schedule.id}>
									<InputsContainer>
										<InputSelectLabel
											style={{ width: '70%' }}
											labelText="Dia da semana"
											selectedValue={schedule.dayOfWeek.numberWeek}
											enabled={editStudent}
										/>
										<InputButtonLabel
											style={{ width: '27%', marginLeft: 'auto' }}
											labelText="Hora"
											value={schedule.time}
											disabled={!editStudent}
											onPress={() => { }}
										/>

										{/* {showCalendar[schedule.id] && (
											<DateTimePicker
												value={schedule.time}
												mode="time"
												display="default"
												onChange={(_, selectedDate) => handleChangeTime(schedule.id, selectedDate)}
											/>
										)} */}
									</InputsContainer>
									{editStudent && (
										<DeleteScheduleContainer>
											<Separator />

											<DeleteScheduleButton onPress={() => { }}>
												<DeleteScheduleButtonText>Excluir horário</DeleteScheduleButtonText>
											</DeleteScheduleButton>

											<Separator />
										</DeleteScheduleContainer>
									)}
								</Schedule>
							)
						})}
						{data.phone && (
							<Button
								icon={() => <FontAwesomeIcon name="whatsapp" color={colors.white} size={23} style={{ marginRight: 10 }} />}
								color={colors.greenWhatsapp}
								onPress={handleSendWhatsappMessage}
								activeOpacity={0.7}
							>
								Enviar mensagem
							</Button>
						)}
						<ButtonsContainer>
							{editStudent ? (
								<Button color={colors.red} onPress={handleCancelEditing} activeOpacity={0.7}>
									Cancelar
								</Button>
							) : (
								<Button color={colors.gray300} onPress={onClose} activeOpacity={0.7}>
									Fechar
								</Button>
							)}

							{editStudent ? (
								<Button color={colors.green} onPress={() => { }} activeOpacity={0.7}>
									Salvar
								</Button>
							) : (
								<Button color={colors.yellow} onPress={() => setEditStudent(true)} activeOpacity={0.7}>
									Editar
								</Button>
							)}
						</ButtonsContainer>
					</ModalItem>
				</TouchableWithoutFeedback>
			</Container>
		</Modal>
	)
}