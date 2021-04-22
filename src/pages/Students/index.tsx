import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Prismic from '@prismicio/client'
import { request } from 'graphql-request'

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
import { getGraphCMSClient } from '../../services/graphcms'

interface StudentSchedules {
	id: string
	dayOfWeek: {
		dayWeek: string
	}
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
		async function fetchStudents() {
			try {
				const graphcms = getGraphCMSClient()

				const response = await graphcms.request(
					`
				{
					students {
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
				const studentsParsed = response.students.map((student: any) => {
					return {
						...student,
						name: student.name.length > 25 ? `${student.name.substring(0, 25)}...` : student.name,
						schedules: student.schedules.map((schedule: any) => {
							return {
								...schedule,
								dayOfWeek: {
									dayWeek: schedule.dayOfWeek.dayWeek.split('-')[0]
								}
							}
						})
					}
				})

				setStudents(studentsParsed)
			} finally {
				setLoading(false)
			}
		}

		fetchStudents()
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