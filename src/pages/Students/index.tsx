import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { RegisterStudentModal } from '../../components/RegisterStudentModal'

import { colors } from '../../styles/colors'

import {
	Container,
	InputContainer,
	Input,
	StudentItem,
	StudentInfo,
	StudentName,
	StudentPhone,
	StudentClassDays,
	DayOfWeek,
	RegisterStudentButton,
} from './styles'

export function Students() {
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<Container>
			<RegisterStudentModal isVisible={isModalVisible} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<InputContainer>
					<FeatherIcon name="search" color={colors.gray300} size={20} />
					<Input
						placeholder="Procurar aluno..."
						placeholderTextColor={colors.gray300}
					/>
				</InputContainer>
				<StudentItem>
					<StudentInfo>
						<StudentName>Pedro César Vagner</StudentName>
						<StudentPhone>(18) 99161-8592</StudentPhone>
					</StudentInfo>
					<StudentClassDays>
						<DayOfWeek>Segunda</DayOfWeek>
						<DayOfWeek>Terça</DayOfWeek>
						<DayOfWeek>Quarta</DayOfWeek>
						<DayOfWeek>Quinta</DayOfWeek>
					</StudentClassDays>
				</StudentItem>
				<StudentItem>
					<StudentInfo>
						<StudentName>Fulano</StudentName>
						<StudentPhone>(18) 99161-8592</StudentPhone>
					</StudentInfo>
					<StudentClassDays>
						<DayOfWeek>Terça</DayOfWeek>
						<DayOfWeek>Quinta</DayOfWeek>
					</StudentClassDays>
				</StudentItem>
				<StudentItem>
					<StudentInfo>
						<StudentName>Ciclano</StudentName>
						<StudentPhone>(18) 99161-8592</StudentPhone>
					</StudentInfo>
					<StudentClassDays>
						<DayOfWeek>Segunda</DayOfWeek>
						<DayOfWeek>Terça</DayOfWeek>
					</StudentClassDays>
				</StudentItem>
			</ScrollView>
			<RegisterStudentButton onPress={() => setIsModalVisible(true)}>
				<FeatherIcon name="plus" color={colors.white} size={25} />
			</RegisterStudentButton>
		</Container>
	)
}