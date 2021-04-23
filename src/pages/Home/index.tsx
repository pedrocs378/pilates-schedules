import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useStudents } from '../../contexts/students'

import { Load } from '../../components/Load'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	Title,
	Content,
	Class,
	Time,
	ClassStudents,
	Student,
} from './styles'

interface StudentProps {
	id: string
	name: string
}

interface ClassStudent {
	time: string
	students: StudentProps[]
}

export function Home() {
	const [classDate, setClassDate] = useState(new Date())
	const [classStudents, setClassStudents] = useState<ClassStudent[]>([])
	const [showCalendar, setShowCalendar] = useState(false)
	const { isLoading, students } = useStudents()

	const navigation = useNavigation()

	function handleChangeClassDate(_: any, selectedDate: Date | undefined) {
		setShowCalendar(oldValue => !oldValue)

		const currentDate = selectedDate || classDate
		setClassDate(currentDate)
	}

	const handleGoToClassSchedule = useCallback(() => {
		navigation.navigate('ClassSchedule')
	}, [])

	useEffect(() => {
		const studentsOfDay = students.filter(student => student.schedules.some(schedule => schedule.dayOfWeek.numberWeek === classDate.getDay()))

		let schedules = [] as Date[]

		studentsOfDay
			.forEach(student => {
				const studentTime = student.schedules.filter(schedule => schedule.dayOfWeek.numberWeek === classDate.getDay())

				if (!schedules.some(schedule => new Date(schedule).getHours() === new Date(studentTime[0].time).getHours())) {
					schedules.push(studentTime[0].time)
				}

			})

		schedules = schedules.sort((a, b) => new Date(a).getHours() - new Date(b).getHours())

		const classes = schedules.map(schedule => {
			const studentsAtSametime = studentsOfDay.filter(student => student.schedules.some(studentSchedule => new Date(studentSchedule.time).getHours() === new Date(schedule).getHours()))

			return {
				time: format(new Date(schedule), 'HH:mm', { locale: ptBR }),
				students: studentsAtSametime.map(student => {
					return {
						...student,
						name: student.name.length > 12 ? `${student.name.substring(0, 12)}...` : student.name
					}
				})
			}
		})

		setClassStudents(classes)

	}, [classDate, students])

	const title = useMemo(() => {
		return format(classDate, "'Aulas -' dd/MM/yyyy", {
			locale: ptBR
		})
	}, [classDate])

	if (isLoading) {
		return (
			<Load />
		)
	}

	return (
		<Container>
			<StatusBar style="auto" translucent backgroundColor="transparent" />

			<Header>
				<Title>{title}</Title>
				<TouchableWithoutFeedback onPress={() => setShowCalendar(oldValue => !oldValue)}>
					<FontAwesomeIcon name="calendar-alt" color={colors.white} size={23} />
				</TouchableWithoutFeedback>

				{showCalendar && (
					<DateTimePicker
						value={classDate}
						mode="date"
						display="default"
						onChange={handleChangeClassDate}
						minimumDate={new Date()}
					/>
				)}
			</Header>
			<Content>
				{classStudents.length > 0 && classStudents.map(classItem => {
					return (
						<Class key={classItem.time} activeOpacity={0.7} onPress={handleGoToClassSchedule}>
							<Time>{classItem.time}</Time>
							<ClassStudents>
								{classItem.students.map(student => (
									<Student key={student.id}>{student.name}</Student>
								))}
							</ClassStudents>
						</Class>
					)
				})}
			</Content>
		</Container>
	)
}