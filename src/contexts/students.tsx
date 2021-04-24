import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getGraphCMSClient } from '../services/graphcms'

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
	phone: string
	schedules: StudentSchedules[]
}

type PublishStudentProps = {
	name: string
	phone?: string
	schedules: {
		id: number
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
	deleteStudent: (id: string) => Promise<void>
}

interface StudentProvider {
	children: ReactNode
}

const StudentContext = createContext<StudentContextData>({} as StudentContextData)

export function StudentProvider({ children }: StudentProvider) {
	const [students, setStudents] = useState<Student[]>([])
	const [isSubscription, setIsSubscription] = useState(true)
	const [isErrored, setIsErrored] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (isSubscription) {
			fetchStudents().then(data => {
				setStudents(data)
			})
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

			return response.students
		} catch {
			setIsErrored(true)
		} finally {
			setIsLoading(false)
		}
	}

	async function publishStudent({ name, phone, schedules }: PublishStudentProps) {
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

		console.log(createStudent)

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
	}

	return (
		<StudentContext.Provider value={{ isLoading, isErrored, students, fetchStudents, publishStudent, deleteStudent }}>
			{children}
		</StudentContext.Provider>
	)

}

export const useStudents = () => useContext(StudentContext)