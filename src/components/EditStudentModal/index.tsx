import React, { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Keyboard, Modal, ToastAndroid, TouchableWithoutFeedback } from 'react-native'
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
	onSubmit: () => void
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
	const [isSubmiting, setIsSubmiting] = useState(false)
	const [editStudent, setEditStudent] = useState(false)
	const [name, setName] = useState(data.name)
	const [phone, setPhone] = useState(data?.phone || '')
	const [showCalendar, setShowCalendar] = useState<ShowScheduleCalendar>(initialScheduleCalendar)
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

	const { updateStudent } = useStudents()

	async function handleSubmit() {
		try {
			setIsSubmiting(true)
			await updateStudent({
				studentId: data.id,
				name,
				phone,
				schedules
			})

			ToastAndroid.show('Aluno modificado com sucesso', ToastAndroid.LONG)
			onSubmit()
			closeModal()
		} catch (err) {
			console.error(err)
			ToastAndroid.show('Erro ao cadastrar aluno', ToastAndroid.LONG)
		} finally {
			setIsSubmiting(false)
		}
	}

	function closeModal() {
		setEditStudent(false)
		onClose()
	}

	function handleSetEditing() {

		let calendars = {} as ShowScheduleCalendar

		data.schedules.forEach(schedule => {
			calendars = {
				...calendars,
				[schedule.id]: false
			}
		})

		setName(data.name)
		setPhone(data?.phone || '')
		setSchedules(data.schedules)
		setShowCalendar(calendars)
		setEditStudent(true)
	}

	function handleCancelEditing() {
		let calendars = {} as ShowScheduleCalendar

		data.schedules.forEach(schedule => {
			calendars = {
				...calendars,
				[schedule.id]: false
			}
		})

		setName(data.name)
		setPhone(data?.phone || '')
		setSchedules(data.schedules)
		setShowCalendar(calendars)
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

		const schedulesToShow = editStudent ? schedules : data.schedules

		return schedulesToShow.map(schedule => {
			return {
				...schedule,
				timeFormated: format(new Date(schedule.time), 'HH:mm', { locale: ptBR }),
			}
		})
	}, [data.schedules, editStudent, schedules])

	if (!data.schedules) {
		return null
	}

	return (
		<Modal
			animationType="fade"
			visible={isVisible}
			onRequestClose={closeModal}
			transparent
		>
			<Container>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ModalItem showsVerticalScrollIndicator={false}>
						<CloseButton onPress={closeModal} activeOpacity={0.2}>
							<FeatherIcon name="x" size={28} color={colors.gray300} />
						</CloseButton>
						<SectionTitle style={{ marginBottom: 25 }}>Dados</SectionTitle>
						<InputTextLabel
							labelText="Nome"
							selectTextOnFocus
							autoCapitalize="words"
							editable={editStudent}
							value={editStudent ? name : data.name}
							onChangeText={text => setName(text)}
						/>
						<InputTextLabelMasked
							labelText="Celular (Somente números)"
							type="cel-phone"
							selectTextOnFocus
							keyboardType="phone-pad"
							placeholder="(18) 9xxxx-xxxx"
							editable={editStudent}
							value={!data.phone ? phone : editStudent ? phone : data.phone}
							onChangeText={text => setPhone(text)}
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
											onValueChange={(value) => handleChangeDayOfWeek(schedule.id, value as number)}
										/>
										<InputButtonLabel
											style={{ width: '27%', marginLeft: 'auto' }}
											labelText="Hora"
											value={schedule.timeFormated}
											disabled={!editStudent}
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
									{editStudent && (
										<DeleteScheduleContainer>
											<Separator />

											<DeleteScheduleButton onPress={() => handleRemoveSchedule(schedule.id)}>
												<DeleteScheduleButtonText>Excluir horário</DeleteScheduleButtonText>
											</DeleteScheduleButton>

											<Separator />
										</DeleteScheduleContainer>
									)}
								</Schedule>
							)
						})}
						{!!data.phone && (
							<Button
								icon={() => <FontAwesomeIcon name="whatsapp" color={colors.white} size={23} style={{ marginRight: 10 }} />}
								color={colors.greenWhatsapp}
								onPress={handleSendWhatsappMessage}
							>
								Enviar mensagem
							</Button>
						)}
						<ButtonsContainer>
							{editStudent ? (
								<Button
									icon={() => isSubmiting ? <ActivityIndicator size="small" color={colors.white} style={{ marginRight: 10 }} /> : null}
									color={colors.green}
									onPress={handleSubmit}
								>
									Salvar
								</Button>
							) : (
								<Button color={colors.yellow} onPress={handleSetEditing}>
									Editar
								</Button>
							)}

							{editStudent ? (
								<Button color={colors.red} onPress={handleCancelEditing}>
									Cancelar
								</Button>
							) : (
								<Button color={colors.gray300} onPress={closeModal}>
									Fechar
								</Button>
							)}
						</ButtonsContainer>
					</ModalItem>
				</TouchableWithoutFeedback>
			</Container>
		</Modal>
	)
}