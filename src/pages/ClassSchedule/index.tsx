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
import { Student as StudentProps, useStudents } from '../../contexts/students'

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
import isEqual from 'date-fns/isEqual'
import { Button } from '../../components/Button'

interface ClassStudentProps {
	id: string
	name: string
	hasMissed: boolean
	hasScheduled: boolean
	willMiss: boolean
}

interface RouteParams {
	students: StudentProps[]
	date: string
}

export function ClassSchedule() {
	const { fetchStudents } = useStudents()
	const { getClassByDate, publishClass, updateClass } = useClasses()

	const [isSubscription, setIsSubscription] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [showRescheduleModal, setShowRescheduleModal] = useState(false)
	const [classStudents, setClassStudents] = useState<ClassStudentProps[]>([])
	const [classId, setClassId] = useState('')
	const [studentIdToReschedule, setStudentIdToReschedule] = useState('')

	const navigation = useNavigation()
	const route = useRoute()
	const { students, date: classDate } = route.params as RouteParams

	async function fetchClass() {
		try {
			const classData = await getClassByDate(classDate)

			const classStudentsResponse = classData ?
				classData.students.map(({ studentId, hasMissed, willMiss }) => {
					const student = students.find(data => data.id === studentId)

					if (student && student.reschedules.some(schedule => {
						const deschedulededDate = new Date(new Date(schedule.deschedulededDate).getFullYear(), new Date(schedule.deschedulededDate).getMonth(), new Date(schedule.deschedulededDate).getDate())
						const classDateSelected = new Date(new Date(classDate).getFullYear(), new Date(classDate).getMonth(), new Date(classDate).getDate())

						return isEqual(deschedulededDate, classDateSelected)
					})) {
						return {
							id: studentId,
							name: student?.name ?? '',
							hasMissed,
							hasScheduled: true,
							willMiss
						}
					}

					return {
						id: studentId,
						name: student?.name ?? '',
						hasMissed,
						hasScheduled: false,
						willMiss
					}

				}) :
				students.map(student => {
					return {
						id: student.id,
						name: student.name,
						hasMissed: false,
						hasScheduled: false,
						willMiss: false
					}
				})

			setClassId(classData ? classData.id : '')
			setClassStudents(classStudentsResponse)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleOnSaveReschedule() {
		await fetchStudents()
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
		if (student.hasMissed || student.hasScheduled) {
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

	const handleShowRescheduleModal = useCallback((id: string) => {
		setStudentIdToReschedule(id)
		setShowRescheduleModal(true)
	}, [])

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
				studentId={studentIdToReschedule}
				onSubmit={handleOnSaveReschedule}
				defaultDate={classDate}
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
											disabled={student.hasMissed ? true : student.hasScheduled ? true : false}
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
									<RescheduleButton
										disabled={student.hasScheduled}
										isDisabled={student.hasScheduled}
										onPress={() => handleShowRescheduleModal(student.id)}
										activeOpacity={0.8}
									>
										<RescheduleButtonText>
											{student.hasScheduled ? "Remarcado para outra data" : "Remarcar"}
										</RescheduleButtonText>
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