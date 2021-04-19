import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

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
				<Class>
					<Time>16:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class>
					<Time>17:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class>
					<Time>18:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class>
					<Time>19:00</Time>
					<ClassStudents>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
						<Student>Pedro César...</Student>
					</ClassStudents>
				</Class>
				<Class>
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