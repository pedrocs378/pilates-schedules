import React, { useMemo, useState } from 'react'
import { Modal, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { colors } from '../../styles/colors'
import { InputButtonLabel } from '../InputButtonLabel'

import { Container, ModalItem, CloseButton, SectionTitle, ScheduleContainer } from './styles'
import { Button } from '../Button'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface RescheduleModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit?: () => void
}

const initialDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0)

export function RescheduleModal({ isVisible, onClose }: RescheduleModalProps) {
	const [rescheduleDateTime, setRescheduleDateTime] = useState(initialDate)
	const [showDateCalendar, setShowDateCalendar] = useState(false)
	const [showTimeCalendar, setShowTimeCalendar] = useState(false)

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
						color={colors.green}
						onPress={() => { }}
					>
						Salvar
					</Button>
				</ModalItem>
			</Container>
		</Modal>
	)
}