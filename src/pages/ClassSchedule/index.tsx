import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ToastAndroid, TouchableNativeFeedback } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CheckBox from '@react-native-community/checkbox'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Load } from '../../components/Load'
import { RescheduleModal } from '../../components/RescheduleModal'

import { useClasses } from '../../contexts/classes'
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

interface ClassStudentProps {
	id: string
	name: string
	hasMissed: boolean
	willMiss: boolean
}

interface RouteParams {
	students: StudentProps[]
	date: string
}

export function ClassSchedule() {
	const { getClassByDate, publishClass, updateClass } = useClasses()

	const [isSubscription, setIsSubscription] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [showRescheduleModal, setShowRescheduleModal] = useState(false)
	const [classStudents, setClassStudents] = useState<ClassStudentProps[]>([])
	const [classId, setClassId] = useState('')

	const navigation = useNavigation()
	const route = useRoute()
	const { students, date: classDate } = route.params as RouteParams

	async function fetchClass() {
		try {
			const classData = await getClassByDate(classDate)

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

			setClassId(classData ? classData.id : '')
			setClassStudents(classStudentsResponse)
		} finally {
			setIsLoading(false)
		}
	}

	const handleHasMissed = useCallback(async (student: ClassStudentProps) => {
		if (student.willMiss) {
			return
		}

		const classData = await getClassByDate(classDate)

		if (!classData) {
			try {
				await publishClass({
					date: classDate,
					students: classStudents.map(data => ({ studentId: data.id, hasMissed: data.hasMissed, willMiss: data.willMiss })),
					studentToUpdate: {
						studentId: student.id,
						willMiss: student.willMiss,
						hasMissed: !student.hasMissed
					}
				})

				ToastAndroid.show('Gravado com sucesso', ToastAndroid.LONG)
			} catch (err) {
				console.error(err)
			}
		} else {
			try {
				await updateClass({
					classId,
					students: classStudents.map(data => ({ studentId: data.id, hasMissed: data.hasMissed, willMiss: data.willMiss })),
					studentToUpdate: {
						studentId: student.id,
						willMiss: student.willMiss,
						hasMissed: !student.hasMissed
					}
				})

				ToastAndroid.show('Gravado com sucesso', ToastAndroid.LONG)
			} catch (err) {
				console.error(err)
			}
		}

		await fetchClass()
	}, [classDate, classStudents, fetchClass])

	const handleWillMiss = useCallback(async (student: ClassStudentProps) => {
		if (student.hasMissed) {
			return
		}

		const classData = await getClassByDate(classDate)

		if (!classData) {
			try {
				await publishClass({
					date: classDate,
					students: classStudents.map(data => ({ studentId: data.id, hasMissed: data.hasMissed, willMiss: data.willMiss })),
					studentToUpdate: {
						studentId: student.id,
						willMiss: !student.willMiss,
						hasMissed: student.hasMissed
					}
				})

				ToastAndroid.show('Gravado com sucesso', ToastAndroid.LONG)
			} catch (err) {
				console.error(err)
			}
		} else {
			try {
				await updateClass({
					classId,
					students: classStudents.map(data => ({ studentId: data.id, hasMissed: data.hasMissed, willMiss: data.willMiss })),
					studentToUpdate: {
						studentId: student.id,
						willMiss: !student.willMiss,
						hasMissed: student.hasMissed
					}
				})

				ToastAndroid.show('Gravado com sucesso', ToastAndroid.LONG)
			} catch (err) {
				console.error(err)
			}
		}

		await fetchClass()
	}, [classDate, classStudents, fetchClass])

	const handleShowRescheduleModal = useCallback(() => setShowRescheduleModal(true), [])

	const title = useMemo(() => {
		return format(new Date(classDate), "dd/MM/yyyy '-' HH:mm", { locale: ptBR })
	}, [classDate])

	useEffect(() => {
		if (isSubscription) {
			fetchClass()
		}

		return () => setIsSubscription(false)
	}, [classDate, students, fetchClass, isSubscription])

	if (isLoading) {
		return (
			<Load />
		)
	}

	return (
		<Container>
			<RescheduleModal
				isVisible={showRescheduleModal}
				onClose={() => setShowRescheduleModal(false)}
			/>

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
									<AbsenceControl isDisabled={student.willMiss} onPress={() => handleHasMissed(student)}>
										<CheckBox
											disabled={student.willMiss ? true : false}
											value={student.willMiss ? false : student.hasMissed}
											onValueChange={() => handleHasMissed(student)}
											tintColors={{
												true: colors.blue,
												false: colors.blue
											}}
										/>
										<AbsenceControlText>Faltou</AbsenceControlText>
									</AbsenceControl>
									<AbsenceControl isDisabled={student.hasMissed} onPress={() => handleWillMiss(student)}>
										<CheckBox
											disabled={student.hasMissed ? true : false}
											value={student.hasMissed ? false : student.willMiss}
											onValueChange={() => handleWillMiss(student)}
											tintColors={{
												true: colors.blue,
												false: colors.blue
											}}
										/>
										<AbsenceControlText>Não irá comparecer</AbsenceControlText>
									</AbsenceControl>
								</StudentAbsenceControlContainer>
								{student.willMiss && (
									<RescheduleButton onPress={handleShowRescheduleModal} activeOpacity={0.8}>
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