import React, { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'

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
	const navigation = useNavigation()

	const handleGoToClassSchedule = useCallback(() => {
		navigation.navigate('ClassSchedule')
	}, [])

	return (
		<Container>
			<StatusBar style="auto" translucent backgroundColor="transparent" />

			<Header>
				<Title>Aulas - 19/04/2021</Title>
				<TouchableWithoutFeedback>
					<FontAwesomeIcon name="calendar-alt" color={colors.white} size={23} />
				</TouchableWithoutFeedback>
			</Header>
			<Content>
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