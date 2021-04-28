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
import { ClassCard } from '../../components/ClassCard'

import { colors } from '../../styles/colors'

import {
	Container,
	Header,
	Title,
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
					<TouchableWithoutFeedback onPress={() => navigation.navigate('AppAbout')}>
						<FontAwesomeIcon name="info-circle" color={colors.white} size={18} />
					</TouchableWithoutFeedback>

					<Title>{title}</Title>

					<TouchableWithoutFeedback onPress={() => setShowCalendar(oldValue => !oldValue)}>
						<FontAwesomeIcon name="calendar-alt" color={colors.white} size={24} />
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
						<WithoutClassesMessageBoxText>Sem aulas agendadas para esta data 😄</WithoutClassesMessageBoxText>
					</WithoutClassesMessageBox>
				)}

				{classStudents.length > 0 && (
					<FlatList
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flex: 1 }}
						data={classStudents}
						keyExtractor={(item) => item.timeParsed}
						renderItem={({ item }) => (
							<ClassCard
								key={item.timeParsed}
								classData={item}
								onPress={() => handleGoToClassSchedule(item.students, item.classDate)}
							/>

						)}
					/>
				)}

			</Container>
		</RefreshControl>
	)
}