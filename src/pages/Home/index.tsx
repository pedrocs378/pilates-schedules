import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
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
		if (isToday(classDate)) {
			return 'Aulas - Hoje'
		}

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
			{classStudents.length === 0 && (
				<WithoutClassesMessageBox>
					<WithoutClassesMessageBoxText>Sem aulas agendadas hoje 😄</WithoutClassesMessageBoxText>
				</WithoutClassesMessageBox>
			)}

			{classStudents.length > 0 && (
				<FlatList
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flex: 1 }}
					data={classStudents}
					keyExtractor={(item) => item.time}
					renderItem={({ item }) => (
						<Class key={item.time} activeOpacity={0.7} onPress={handleGoToClassSchedule}>
							<Time>{item.time}</Time>
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
	)
}