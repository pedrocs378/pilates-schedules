import React, { useMemo } from 'react'
import { View } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
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

interface StudentCardProps extends RectButtonProps {
	student: Student
	onDelete: () => void
}

export function StudentCard({ student, onDelete, ...rest }: StudentCardProps) {

	const studentParsed = useMemo(() => {
		return {
			...student,
			name: student.name.length > 25 ? `${student.name.substring(0, 25)}...` : student.name,
			schedules: student.schedules.map((schedule) => {
				return {
					...schedule,
					dayOfWeek: {
						...schedule.dayOfWeek,
						dayWeek: schedule.dayOfWeek.dayWeek.split('-')[0]
					}
				}
			})
		}
	}, [student])

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
			<Container {...rest}>
				<StudentInfo>
					<StudentName>{studentParsed.name}</StudentName>
					<StudentPhoneContainer>
						<FontAwesomeIcon name="whatsapp" size={20} color={colors.greenWhatsapp} />
						<StudentPhone>{studentParsed.phone || "Não informado"}</StudentPhone>
					</StudentPhoneContainer>
				</StudentInfo>
				<StudentClassDays>
					{studentParsed.schedules && studentParsed.schedules.map(schedule => {
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