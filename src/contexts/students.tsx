import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getGraphCMSClient } from '../services/graphcms'
import { useClasses } from './classes'

export interface StudentSchedules {
	id: string
	time: Date
	dayOfWeek: {
		dayWeek: string
		numberWeek: number
	}
}

export interface Student {
	id: string
	name: string
	phone?: string
	schedules: StudentSchedules[]
}

type PublishStudentProps = {
	name: string
	phone?: string
	schedules: {
		id: string
		dayOfWeek: {
			numberWeek: number
			dayWeek: string
		}
		time: Date
	}[]
}

type UpdateStudentProps = {
	studentId: string
	name: string
	phone?: string
	schedules: {
		id: string
		dayOfWeek: {
			numberWeek: number
			dayWeek: string
		}
		time: Date
	}[]
}

interface StudentContextData {
	isErrored: boolean
	isLoading: boolean
	students: Student[]
	fetchStudents: () => Promise<Student[]>
	publishStudent: (student: PublishStudentProps) => Promise<void>
	updateStudent: (student: UpdateStudentProps) => Promise<void>
	deleteStudent: (id: string) => Promise<void>
}

interface StudentProviderProps {
	children: ReactNode
}

const StudentContext = createContext<StudentContextData>({} as StudentContextData)

export function StudentProvider({ children }: StudentProviderProps) {
	const [students, setStudents] = useState<Student[]>([])
	const [isSubscription, setIsSubscription] = useState(true)
	const [isErrored, setIsErrored] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const { getClasses, deleteStudentFromClass } = useClasses()

	useEffect(() => {
		if (isSubscription) {
			fetchStudents()
		}

		return () => setIsSubscription(false)
	}, [fetchStudents, isSubscription])

	async function fetchStudents() {
		setIsErrored(false)
		try {
			const graphcms = getGraphCMSClient()

			const response = await graphcms.request(
				`
			{
				students {
					id
					name
					phone
					schedules {
						id
						time
						dayOfWeek
					}
				}
			}
			  
			`
			)

			setStudents(response.students)
			return response.students
		} catch {
			setIsErrored(true)
		} finally {
			setIsLoading(false)
		}
	}

	async function publishStudent({ name, phone = "", schedules }: PublishStudentProps) {
		const graphcms = getGraphCMSClient()

		const newSchedules = schedules.map(schedule => {
			return {
				time: schedule.time,
				dayOfWeek: schedule.dayOfWeek
			}
		})

		const { createStudent } = await graphcms.request(
			`mutation createNewStudent($schedules: [ScheduleCreateInput!]){
				createStudent(data: { name: "${name}", phone: "${phone}", schedules: { create: $schedules } }) {
					id
					name
					phone
					schedules {
						id
						time
						dayOfWeek
					}
				}
			}`, {
			schedules: newSchedules
		}
		)

		await graphcms.request(
			`mutation {
				publishStudent(where: { id: "${createStudent.id}" }, to: PUBLISHED) {
					id
				}
			}`
		);

		await graphcms.request(
			`mutation {
				publishManySchedulesConnection(where: { student: { id: "${createStudent.id}" } }, to: PUBLISHED) {
					edges {
						node {
							id
						}
					}
				}
			}`
		);
	}

	async function updateStudent({ studentId, name, phone = "", schedules }: UpdateStudentProps) {
		const graphcms = getGraphCMSClient()

		const newSchedules = schedules.map(schedule => {
			return {
				time: schedule.time,
				dayOfWeek: schedule.dayOfWeek
			}
		})

		await graphcms.request(
			`mutation {
				deleteManySchedulesConnection(where: { student: { id: "${studentId}" } }) {
					edges {
						node {
							id
						}
					}
				}
			}`
		);

		await graphcms.request(
			`mutation {
				unpublishManySchedulesConnection(where: { id: "${studentId}" }, from: PUBLISHED) {
					edges {
						node {
							id
						}
					}
				}
			}`
		);

		const { updateStudent } = await graphcms.request(
			`mutation updateStudent($schedules: [ScheduleCreateInput!]){
				updateStudent(where: { id: "${studentId}" }, data: { name: "${name}", phone: "${phone}", schedules: { create: $schedules } }) {
					id
					name
					phone
					schedules {
						id
						time
						dayOfWeek
					}
				}
			}`, {
			schedules: newSchedules
		}
		)

		await graphcms.request(
			`mutation {
				publishStudent(where: { id: "${updateStudent.id}" }, to: PUBLISHED) {
					id
				}
			}`
		);

		await graphcms.request(
			`mutation {
				publishManySchedulesConnection(where: { student: { id: "${updateStudent.id}" } }, to: PUBLISHED) {
					edges {
						node {
							id
						}
					}
				}
			}`
		);
	}

	async function deleteStudent(id: string) {
		const graphcms = getGraphCMSClient()

		const { deleteStudent } = await graphcms.request(
			`mutation {
				deleteStudent(where: { id: "${id}" }) {
					id
				}
			}`
		)

		await graphcms.request(
			`mutation {
				unpublishStudent(where: { id: "${deleteStudent.id}" }, from: PUBLISHED) {
					id
				}
			}`
		);

		const classes = await getClasses()

		for await (const classData of classes) {
			deleteStudentFromClass({
				classId: classData.id,
				studentId: id
			})
		}
	}

	return (
		<StudentContext.Provider value={{ isLoading, isErrored, students, fetchStudents, updateStudent, publishStudent, deleteStudent }}>
			{children}
		</StudentContext.Provider>
	)

}

export const useStudents = () => useContext(StudentContext)