import React from 'react'
import { View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated from 'react-native-reanimated'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { Student } from '../../contexts/students'

import { colors } from '../../styles/colors'

import {
	Container,
	ButtonRemove,
	StudentInfo,
	StudentName,
	StudentPhoneContainer,
	StudentPhone,
	StudentClassDays,
	DayOfWeek
} from './styles'

interface StudentCardProps {
	student: Student
	onDelete: () => void
}

export function StudentCard({ student, onDelete }: StudentCardProps) {

	return (
		<Swipeable
			overshootRight={false}
			renderRightActions={() => (
				<Animated.View>
					<View>
						<ButtonRemove onPress={onDelete}>
							<FeatherIcon name="trash" size={28} color={colors.white} />
						</ButtonRemove>
					</View>
				</Animated.View>
			)}
		>
			<Container>
				<StudentInfo>
					<StudentName>{student.name}</StudentName>
					<StudentPhoneContainer>
						<FontAwesomeIcon name="whatsapp" size={20} color={colors.greenWhatsapp} />
						<StudentPhone>{student.phone || "Não informado"}</StudentPhone>
					</StudentPhoneContainer>
				</StudentInfo>
				<StudentClassDays>
					{student.schedules && student.schedules.map(schedule => {
						return (
							<DayOfWeek key={schedule.id}>
								{schedule.dayOfWeek.dayWeek}
							</DayOfWeek>
						)
					})}
				</StudentClassDays>
			</Container>
		</Swipeable>
	)
}