import React, { useEffect, useMemo, useState } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CheckBox from '@react-native-community/checkbox'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { getGraphCMSClient } from '../../services/graphcms'
import { Student as StudentProps } from '../../contexts/students'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	HeaderTitle,
	Content,
	ClassStudentsCard,
	StudentItem,
	StudentName,
	StudentAbsenceControlContainer,
	AbsenceControl,
	AbsenceControlText,
	RescheduleButton,
	RescheduleButtonText,
} from './styles'
import { Load } from '../../components/Load'

interface ClassStudent {
	id: string
	name: string
	hasMissed: boolean
	willMiss: boolean
}

interface GraphCMSResponse {
	classes: {
		classDate: string
		id: string
		students: {
			hasMissed: boolean
			willMiss: boolean
			studentId: string
		}[]
	}[]
}

interface RouteParams {
	students: StudentProps[]
	date: string
}

export function ClassSchedule() {
	const [isLoading, setIsLoading] = useState(true)
	const [classStudents, setClassStudents] = useState<ClassStudent[]>([])

	const navigation = useNavigation()
	const route = useRoute()
	const { students, date: classDate } = route.params as RouteParams

	function handleHasMissed() {

	}

	function handleWillMiss() {

	}

	const title = useMemo(() => {
		return format(new Date(classDate), "dd/MM/yyyy '-' HH:mm", { locale: ptBR })
	}, [classDate])

	useEffect(() => {
		async function fetchClasses() {
			try {
				const graphcms = getGraphCMSClient()

				const response = await graphcms.request<GraphCMSResponse>(
					`
				{
					classes(where: { classDate: "${new Date(classDate).toISOString()}" }) {
						id
						classDate
						students
					}
				}
					
				`
				)

				const [classData] = response.classes

				const classStudentsResponse = classData ?
					classData.students.map(({ studentId, hasMissed, willMiss }) => {
						const student = students.find(data => data.id === studentId)

						return {
							id: studentId,
							name: student?.name ?? '',
							hasMissed,
							willMiss
						}

					}) :
					students.map(student => {
						return {
							id: student.id,
							name: student.name,
							hasMissed: false,
							willMiss: false
						}
					})

				setClassStudents(classStudentsResponse)
			} finally {
				setIsLoading(false)
			}
		}

		fetchClasses()
	}, [classDate, students])

	if (isLoading) {
		return (
			<Load />
		)
	}

	return (
		<Container>
			<Header>
				<TouchableNativeFeedback onPress={navigation.goBack}>
					<FeatherIcon name="arrow-left" size={24} color={colors.white} />
				</TouchableNativeFeedback>
				<HeaderTitle>{title}</HeaderTitle>
			</Header>
			<Content>
				<ClassStudentsCard>
					{classStudents.map((student, index) => {
						return (
							<StudentItem key={student.id} isLast={index === students.length - 1}>
								<StudentName>{student.name}</StudentName>
								<StudentAbsenceControlContainer>
									<AbsenceControl onPress={handleHasMissed}>
										<CheckBox
											value={student.willMiss ? false : student.hasMissed}
											onValueChange={handleHasMissed}
											tintColors={{
												true: colors.blue,
												false: colors.blue
											}}
										/>
										<AbsenceControlText>Faltou</AbsenceControlText>
									</AbsenceControl>
									<AbsenceControl onPress={handleWillMiss}>
										<CheckBox
											value={student.hasMissed ? false : student.willMiss}
											onValueChange={handleWillMiss}
											tintColors={{
												true: colors.blue,
												false: colors.blue
											}}
										/>
										<AbsenceControlText>Não irá comparecer</AbsenceControlText>
									</AbsenceControl>
								</StudentAbsenceControlContainer>
								{student.willMiss && (
									<RescheduleButton activeOpacity={0.8}>
										<RescheduleButtonText>Remarcar</RescheduleButtonText>
									</RescheduleButton>
								)}
							</StudentItem>
						)
					})}
				</ClassStudentsCard>
			</Content>
		</Container>
	)
}