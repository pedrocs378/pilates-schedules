import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Prismic from '@prismicio/client'

import { RegisterStudentModal } from '../../components/RegisterStudentModal'
import { getPrismicClient } from '../../services/prismic'

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

interface StudentSchedules {
	dayofweek: {
		key: string
		value: string
	}
	time: string
}

interface Student {
	id: string
	name: string
	phone: string
	schedules: StudentSchedules[]
}

export function Students() {
	const [students, setStudents] = useState<Student[]>([])
	const [loading, setLoading] = useState(true)
	const [isModalVisible, setIsModalVisible] = useState(false)

	useEffect(() => {
		const prismic = getPrismicClient()

		prismic
			.query(Prismic.predicates.at('document.type', 'students'), { pageSize: 10, 'fetchLinks': 'days_of_week.value' })
			.then(response => {
				const studentsData = response.results.map(student => {
					const schedules = student.data.schedules.map((schedule: any) => {
						return {
							dayofweek: {
								key: schedule.dayofweek.uid,
								value: schedule.dayofweek.data.value.split('-')[0]
							},
							time: schedule.time
						}
					})

					return {
						id: student.id,
						name: student.data.name.length > 25 ? `${student.data.name.substring(0, 25)}...` : student.data.name,
						phone: student.data.phone,
						schedules
					}
				})

				setStudents(studentsData)
			})
			.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return (
			<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size={40} color={colors.blue} />
			</SafeAreaView>
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
					<FeatherIcon name="search" color={colors.gray300} size={20} />
					<Input
						placeholder="Procurar aluno..."
						placeholderTextColor={colors.gray300}
					/>
				</InputContainer>
				{students.map(student => {
					return (
						<StudentItem key={student.id}>
							<StudentInfo>
								<StudentName>{student.name}</StudentName>
								<StudentPhone>{student.phone}</StudentPhone>
							</StudentInfo>
							<StudentClassDays>
								{student.schedules.map(schedule => {
									return (
										<DayOfWeek key={schedule.dayofweek.key}>
											{schedule.dayofweek.value}
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