import React, { createContext, ReactNode, useContext } from 'react'

import { getGraphCMSClient } from '../services/graphcms'

export interface StudentInfoProps {
	hasMissed: boolean
	willMiss: boolean
	studentId: string
}

interface PublishClassProps {
	date: string
	students: StudentInfoProps[]
	studentToUpdate: StudentInfoProps
}

interface UpdateClassProps {
	classId: string
	students: StudentInfoProps[]
	studentToUpdate: StudentInfoProps
}

interface ClassProps {
	classDate: string
	id: string
	students: StudentInfoProps[]
}

interface GraphCMSResponse {
	classes: ClassProps[]
}

interface ClassesContextData {
	getClassByDate: (date: string) => Promise<ClassProps>
	publishClass: (data: PublishClassProps) => Promise<void>
	updateClass: (data: UpdateClassProps) => Promise<void>
}

interface ClassesProvider {
	children: ReactNode
}

const ClassesContext = createContext<ClassesContextData>({} as ClassesContextData)

export function ClassesProvider({ children }: ClassesProvider) {

	async function getClassByDate(date: string) {
		const graphcms = getGraphCMSClient()

		const response = await graphcms.request<GraphCMSResponse>(
			`
		{
			classes(where: { classDate: "${new Date(date).toISOString()}" }) {
				id
				classDate
				students
			}
		}
			
		`
		)

		const [classData] = response.classes

		return classData
	}

	async function publishClass({ date, students, studentToUpdate }: PublishClassProps) {
		const graphcms = getGraphCMSClient()

		const newStudents = students.map(student => {
			if (student.studentId === studentToUpdate.studentId) {
				return {
					...studentToUpdate,
				}
			}

			return student
		})

		const { createClass } = await graphcms.request(
			`mutation createNewClass($students: [Json!]) {
				createClass(data: { classDate: "${new Date(date).toISOString()}", students: $students }) {
					id
					classDate
					students
				}
			}`, {
			students: newStudents
		}
		)

		await graphcms.request(
			`mutation {
				publishClass(where: { id: "${createClass.id}" }, to: PUBLISHED) {
					id
				}
			}`
		);
	}

	async function updateClass({ classId, students, studentToUpdate }: UpdateClassProps) {
		const graphcms = getGraphCMSClient()

		const studentsUpdated = students.map(student => {
			if (student.studentId === studentToUpdate.studentId) {
				return {
					...studentToUpdate,
				}
			}

			return student
		})

		const { updateClass } = await graphcms.request(
			`mutation updateExistingClass($students: [Json!]) {
				updateClass(where: { id: "${classId}" }  data: { students: $students }) {
					id
					classDate
					students
				}
			}`, {
			students: studentsUpdated
		}
		)

		await graphcms.request(
			`mutation {
				publishClass(where: { id: "${updateClass.id}" }, to: PUBLISHED) {
					id
				}
			}`
		);
	}

	return (
		<ClassesContext.Provider value={{ getClassByDate, publishClass, updateClass }}>
			{children}
		</ClassesContext.Provider>
	)
}

export const useClasses = () => useContext(ClassesContext)