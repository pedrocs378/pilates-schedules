import React from 'react'
import { Keyboard, Modal, TouchableWithoutFeedback, View } from 'react-native'

import { Button } from '../Button'
import { InputTextLabel } from '../InputTextLabel'

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

interface RegisterStudentModalProps {
	isVisible: boolean
	onClose: () => void
}

export function RegisterStudentModal({ isVisible, onClose }: RegisterStudentModalProps) {

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
							<NewScheduleButton>
								<NewScheduleButtonText>+  Novo horário</NewScheduleButtonText>
							</NewScheduleButton>
						</SectionTitleContainer>
						<InputsContainer>
							<InputTextLabel
								style={{ width: '70%' }}
								labelText="Dia da semana"
							/>
							<InputTextLabel
								style={{ width: '27%', marginLeft: 'auto' }}
								labelText="Hora"
							/>
						</InputsContainer>
						<ButtonsContainer>
							<Button color={colors.red} onPress={onClose} activeOpacity={0.7}>
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