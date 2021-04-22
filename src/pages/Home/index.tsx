import React, { useCallback, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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

export function Home() {
	const [showCalendar, setShowCalendar] = useState(false)
	const [classDate, setClassDate] = useState(new Date())

	const navigation = useNavigation()

	function handleChangeClassDate(_: any, selectedDate: Date | undefined) {
		setShowCalendar(oldValue => !oldValue)

		const currentDate = selectedDate || classDate
		setClassDate(currentDate)
	}

	const handleGoToClassSchedule = useCallback(() => {
		navigation.navigate('ClassSchedule')
	}, [])

	const title = useMemo(() => {
		return format(classDate, "'Aulas -' dd/MM/yyyy", {
			locale: ptBR
		})
	}, [classDate])

	return (
		<Container>
			<StatusBar style="auto" translucent backgroundColor="transparent" />

			<Header>
				<Title>{title}</Title>
				<TouchableWithoutFeedback onPress={() => setShowCalendar(oldValue => !oldValue)}>
					<FontAwesomeIcon name="calendar-alt" color={colors.white} size={23} />
				</TouchableWithoutFeedback>
			</Header>
			<Content>
				{showCalendar && (
					<DateTimePicker
						value={classDate}
						mode="date"
						display="default"
						onChange={handleChangeClassDate}
						minimumDate={new Date()}
					/>
				)}

				<Class onPress={handleGoToClassSchedule}>
					<Time>16:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class onPress={handleGoToClassSchedule}>
					<Time>17:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class onPress={handleGoToClassSchedule}>
					<Time>18:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class onPress={handleGoToClassSchedule}>
					<Time>19:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class onPress={handleGoToClassSchedule}>
					<Time>20:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
			</Content>
		</Container>
	)
}