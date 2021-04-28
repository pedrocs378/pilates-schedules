import React, { useMemo } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Time, ClassStudents, Student } from './styles'

interface StudentProps {
	id: string
	name: string
}

interface ClassStudent {
	timeParsed: string
	classDate: Date
	students: StudentProps[]
}

interface ClassCardProps extends TouchableOpacityProps {
	classData: ClassStudent
}

export function ClassCard({ classData, ...rest }: ClassCardProps) {

	const classDataFormated = useMemo(() => {
		return {
			...classData,
			students: classData.students.map(student => {
				return {
					...student,
					name: student.name.length > 12 ? `${student.name.substring(0, 12)}...` : student.name
				}
			})
		}
	}, [classData])

	return (
		<Container activeOpacity={0.7} {...rest}>
			<Time>{classDataFormated.timeParsed}</Time>
			<ClassStudents>
				{classDataFormated.students.map(student => (
					<Student key={student.id}>{student.name}</Student>
				))}
			</ClassStudents>
		</Container>
	)
}