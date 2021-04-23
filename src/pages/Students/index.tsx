import React, { useMemo, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import { RegisterStudentModal } from '../../components/RegisterStudentModal'
import { Load } from '../../components/Load'

import { getGraphCMSClient } from '../../services/graphcms'
import { useStudents, Student } from '../../contexts/students'

import { colors } from '../../styles/colors'

import {
	Container,
	InputContainer,
	Input,
	StudentItem,
	StudentInfo,
	StudentName,
	StudentPhoneContainer,
	StudentPhone,
	StudentClassDays,
	DayOfWeek,
	RegisterStudentButton,
} from './styles'

export function Students() {
	const { isLoading, students } = useStudents()

	const [studentsToBeShow, setStudentsToBeShow] = useState<Student[]>(students)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isParsing, setIsParsing] = useState(true)

	async function handleSearchStudent(name: string) {
		const graphcms = getGraphCMSClient()

		const response = await graphcms.request(
			`
		{
			students(where: { name_contains: "${name}" }) {
				id
				name
				phone
				schedules {
					id
					dayOfWeek {
						dayWeek
					}
				}
			}
		}
			
		`
		)

		setStudentsToBeShow(response.students)
	}

	const studentsParsed = useMemo(() => {
		return studentsToBeShow.map((student, index) => {
			if (index === students.length - 1) {
				setIsParsing(false)
			}

			return {
				...student,
				name: student.name.length > 25 ? `${student.name.substring(0, 25)}...` : student.name,
				schedules: student.schedules.map((schedule) => {
					return {
						...schedule,
						dayOfWeek: {
							...schedule.dayOfWeek,
							dayWeek: schedule.dayOfWeek.dayWeek.split('-')[0]
						}
					}
				})
			}
		})
	}, [studentsToBeShow])

	if (isLoading || isParsing) {
		return (
			<Load />
		)
	}

	return (
		<Container>
			<RegisterStudentModal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<InputContainer>
					<FeatherIcon name="search" color={colors.gray600} size={20} />
					<Input
						placeholder="Procurar aluno..."
						placeholderTextColor={colors.gray600}
						onChangeText={handleSearchStudent}
					/>
				</InputContainer>
				{studentsParsed.map(student => {
					return (
						<StudentItem key={student.id}>
							<StudentInfo>
								<StudentName>{student.name}</StudentName>
								<StudentPhoneContainer>
									<FontAwesomeIcon name="whatsapp" size={20} color={colors.greenWhatsapp} />
									<StudentPhone>{student.phone}</StudentPhone>
								</StudentPhoneContainer>
							</StudentInfo>
							<StudentClassDays>
								{student.schedules && student.schedules.map(schedule => {
									return (
										<DayOfWeek key={schedule.id}>
											{schedule.dayOfWeek.dayWeek}
										</DayOfWeek>
									)
								})}
							</StudentClassDays>
						</StudentItem>
					)
				})}
			</ScrollView>
			<RegisterStudentButton onPress={() => setIsModalVisible(true)}>
				<FeatherIcon name="plus" color={colors.white} size={25} />
			</RegisterStudentButton>
		</Container>
	)
}