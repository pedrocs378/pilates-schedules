import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format, isToday } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useStudents } from '../../contexts/students'

import { Load } from '../../components/Load'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	Title,
	Class,
	Time,
	ClassStudents,
	Student,
	WithoutClassesMessageBox,
	WithoutClassesMessageBoxText
} from './styles'

interface StudentProps {
	id: string
	name: string
}

interface ClassStudent {
	timeParsed: string
	classDate: Date
	students: StudentProps[]
}

export function Home() {
	const [classDate, setClassDate] = useState(new Date())
	const [classStudents, setClassStudents] = useState<ClassStudent[]>([])
	const [showCalendar, setShowCalendar] = useState(false)
	const [refresh, setRefresh] = useState(false)

	const { isLoading, students, fetchStudents } = useStudents()

	const navigation = useNavigation()

	async function handleRefresh() {
		setRefresh(true)

		try {
			await fetchStudents()
		} finally {
			setRefresh(false)
		}
	}

	function handleChangeClassDate(_: any, selectedDate: Date | undefined) {
		setShowCalendar(oldValue => !oldValue)

		const currentDate = selectedDate || classDate
		setClassDate(currentDate)
	}

	const handleGoToClassSchedule = useCallback((students: StudentProps[], date: Date) => {
		navigation.navigate('ClassSchedule', { students, date: date.toString() })
	}, [navigation.navigate])

	const classStudentsParsed = useMemo(() => {
		return classStudents.map(classData => {
			return {
				...classData,
				students: classData.students.map(student => {
					return {
						...student,
						name: student.name.length > 12 ? `${student.name.substring(0, 12)}...` : student.name
					}
				})
			}
		})
	}, [classStudents])

	const title = useMemo(() => {
		if (isToday(classDate)) {
			return 'Aulas - Hoje'
		}

		return format(classDate, "'Aulas -' dd/MM/yyyy", {
			locale: ptBR
		})
	}, [classDate])

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
			const studentsAtSametime = studentsOfDay.filter(student => student.schedules.some(studentSchedule => (new Date(studentSchedule.time).getHours() === new Date(schedule).getHours()) && (studentSchedule.dayOfWeek.numberWeek === classDate.getDay())))

			return {
				timeParsed: format(new Date(schedule), 'HH:mm', { locale: ptBR }),
				classDate: new Date(new Date(classDate).getFullYear(), new Date(classDate).getMonth(), new Date(classDate).getDate(), new Date(schedule).getHours(), new Date(schedule).getMinutes()),
				students: studentsAtSametime
			}
		})

		setClassStudents(classes)

	}, [classDate, students])

	if (isLoading) {
		return (
			<Load />
		)
	}

	return (
		<RefreshControl
			refreshing={refresh}
			onRefresh={handleRefresh}
			style={{ flex: 1 }}
		>
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
				{classStudentsParsed.length === 0 && (
					<WithoutClassesMessageBox>
						<WithoutClassesMessageBoxText>Sem aulas agendadas hoje 😄</WithoutClassesMessageBoxText>
					</WithoutClassesMessageBox>
				)}

				{classStudentsParsed.length > 0 && (
					<FlatList
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
						data={classStudentsParsed}
						keyExtractor={(item) => item.timeParsed}
						renderItem={({ item, index }) => (
							<Class key={item.timeParsed} activeOpacity={0.7} onPress={() => handleGoToClassSchedule(classStudents[index].students, item.classDate)}>
								<Time>{item.timeParsed}</Time>
								<ClassStudents>
									{item.students.map(student => (
										<Student key={student.id}>{student.name}</Student>
									))}
								</ClassStudents>
							</Class>
						)}
					/>
				)}

			</Container>
		</RefreshControl>
	)
}