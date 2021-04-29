import React, { useMemo, useState } from 'react'
import { ActivityIndicator, Modal, ToastAndroid } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { InputButtonLabel } from '../InputButtonLabel'
import { Button } from '../Button'

import { useStudents } from '../../contexts/students'

import { colors } from '../../styles/colors'

import { Container, ModalItem, CloseButton, SectionTitle, ScheduleContainer } from './styles'

interface RescheduleModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit?: () => void
	studentId: string
}

const initialDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0)

export function RescheduleModal({ isVisible, studentId, onClose }: RescheduleModalProps) {
	const [rescheduleDateTime, setRescheduleDateTime] = useState(initialDate)
	const [isSaving, setIsSaving] = useState(false)
	const [showDateCalendar, setShowDateCalendar] = useState(false)
	const [showTimeCalendar, setShowTimeCalendar] = useState(false)

	const { addNewReschedule } = useStudents()

	function closeModal() {
		setRescheduleDateTime(initialDate)
		setShowTimeCalendar(false)
		setShowDateCalendar(false)
		onClose()
	}

	function handleChangeRescheduleDate(date: Date | undefined) {
		setShowDateCalendar(false)

		if (date) {
			setRescheduleDateTime(date)
		}
	}

	function handleChangeRescheduleTime(time: Date | undefined) {
		setShowTimeCalendar(false)

		if (time) {
			setRescheduleDateTime(time)
		}
	}

	async function handleSaveReschedule() {
		try {
			setIsSaving(true)

			await addNewReschedule({
				studentId,
				schedule: {
					classDate: rescheduleDateTime
				}
			})

			ToastAndroid.show('Salvo', ToastAndroid.LONG)
		} catch (err) {
			console.error(err)
			ToastAndroid.show('Algo deu errado, tente novamente', ToastAndroid.LONG)
		} finally {
			setIsSaving(false)
		}
	}

	const rescheduleDateFormated = useMemo(() => {
		return format(rescheduleDateTime, 'dd/MM/yyyy', { locale: ptBR })
	}, [rescheduleDateTime])

	const rescheduleTimeFormated = useMemo(() => {
		return format(rescheduleDateTime, 'HH:mm', { locale: ptBR })
	}, [rescheduleDateTime])

	return (
		<Modal
			animationType="fade"
			visible={isVisible}
			onRequestClose={closeModal}
			transparent
		>
			<Container>
				<ModalItem>
					<CloseButton onPress={closeModal} activeOpacity={0.2}>
						<FeatherIcon name="x" size={28} color={colors.gray300} />
					</CloseButton>
					<SectionTitle style={{ marginBottom: 25 }}>Escolha o dia e a hora</SectionTitle>
					<ScheduleContainer>
						<InputButtonLabel
							labelText="Dia"
							value={rescheduleDateFormated}
							style={{ width: '60%' }}
							onPress={() => setShowDateCalendar(true)}
						/>
						{showDateCalendar && (
							<DateTimePicker
								value={rescheduleDateTime}
								mode="date"
								display="default"
								onChange={(_, date) => handleChangeRescheduleDate(date)}
								minimumDate={new Date()}
							/>
						)}


						<InputButtonLabel
							labelText="Hora"
							value={rescheduleTimeFormated}
							style={{ width: '30%' }}
							onPress={() => setShowTimeCalendar(true)}
						/>
						{showTimeCalendar && (
							<DateTimePicker
								value={rescheduleDateTime}
								mode="time"
								display="default"
								onChange={(_, time) => handleChangeRescheduleTime(time)}
							/>
						)}
					</ScheduleContainer>
					<Button
						icon={() => isSaving ? <ActivityIndicator size="small" color={colors.white} style={{ marginRight: 10 }} /> : null}
						color={colors.green}
						onPress={handleSaveReschedule}
					>
						Salvar
					</Button>
				</ModalItem>
			</Container>
		</Modal>
	)
}