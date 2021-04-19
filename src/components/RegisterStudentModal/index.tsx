import React from 'react'
import { Modal } from 'react-native'

import { InputTextLabel } from '../InputTextLabel'

import {
	Container,
	ModalItem,
	SectionTitle,
	SectionTitleContainer,
	NewScheduleButton,
	NewScheduleButtonText,
	InputsContainer,
	ButtonsContainer,
	CancelButton,
	CancelButtonText,
	SaveButton,
	SaveButtonText,
} from './styles'

interface RegisterStudentModalProps {
	isVisible: boolean
}

export function RegisterStudentModal({ isVisible }: RegisterStudentModalProps) {

	return (
		<Modal transparent visible={isVisible}>
			<Container>
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
						<CancelButton>
							<CancelButtonText>Cancelar</CancelButtonText>
						</CancelButton>
						<SaveButton>
							<SaveButtonText>Salvar</SaveButtonText>
						</SaveButton>
					</ButtonsContainer>
				</ModalItem>
			</Container>
		</Modal>
	)
}