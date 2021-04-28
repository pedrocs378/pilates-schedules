import React, { useCallback, useMemo, useState } from 'react'
import { Alert, ToastAndroid, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { RegisterStudentModal } from '../../components/RegisterStudentModal'
import { EditStudentModal } from '../../components/EditStudentModal'
import { Load } from '../../components/Load'
import { StudentCard } from '../../components/StudentCard'

import { getGraphCMSClient } from '../../services/graphcms'
import { useStudents, Student } from '../../contexts/students'

import { colors } from '../../styles/colors'

import {
	Container,
	SearchContainer,
	InputSearch,
	RegisterStudentButton,
} from './styles'

export function Students() {
	const { isLoading, students, fetchStudents, deleteStudent } = useStudents()

	const [studentSelected, setStudentSelected] = useState<Student>({} as Student)
	const [studentsToBeShow, setStudentsToBeShow] = useState<Student[]>(students)
	const [isRegisterStudentModalVisible, setIsRegisterStudentModalVisible] = useState(false)
	const [isEditStudentModalVisible, setIsEditStudentModalVisible] = useState(false)

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

	async function handleReloadStudents() {
		const newStudents = await fetchStudents()

		setStudentsToBeShow(newStudents)
	}

	const handleRemoveStudent = useCallback((student: Student) => {
		Alert.alert('Remover aluno', `Deseja mesmo remover o(a) aluno(a) ${student.name}?`, [
			{
				text: 'Não 😎',
				style: 'cancel'
			}, {
				text: 'Sim 😥',
				onPress: async () => {
					try {
						await deleteStudent(student.id)

						const newStudents = await fetchStudents()

						setStudentsToBeShow(newStudents)
						ToastAndroid.show(`${student.name} agora não é mais seu aluno`, ToastAndroid.LONG)
					} catch (err) {
						console.error(err)
						ToastAndroid.show(`Não foi possivel excluir este aluno.`, ToastAndroid.LONG)
					}
				}
			}
		])
	}, [deleteStudent, fetchStudents])

	const handleOpenOrCloseEditModal = useCallback((value: boolean, student: Student) => {
		setStudentSelected(student)
		setIsEditStudentModalVisible(value)
	}, [])

	if (isLoading) {
		return (
			<Load />
		)
	}

	return (
		<Container>
			<RegisterStudentModal
				isVisible={isRegisterStudentModalVisible}
				onClose={() => setIsRegisterStudentModalVisible(false)}
				onSubmit={handleReloadStudents}
			/>

			<EditStudentModal
				isVisible={isEditStudentModalVisible}
				onClose={() => handleOpenOrCloseEditModal(false, {} as Student)}
				data={studentSelected}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<SearchContainer>
					<FeatherIcon name="search" color={colors.gray600} size={20} />
					<InputSearch
						placeholder="Procurar aluno..."
						selectTextOnFocus
						autoCorrect
						autoCompleteType="name"
						placeholderTextColor={colors.gray600}
						onChangeText={handleSearchStudent}
					/>
				</SearchContainer>
				{studentsToBeShow.map(student => {
					return (
						<StudentCard
							key={student.id}
							student={student}
							onDelete={() => handleRemoveStudent(student)}
							onPress={() => handleOpenOrCloseEditModal(true, student)}
						/>
					)
				})}
			</ScrollView>

			<RegisterStudentButton onPress={() => setIsRegisterStudentModalVisible(true)}>
				<FeatherIcon name="plus" color={colors.white} size={25} />
			</RegisterStudentButton>
		</Container>
	)
}