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

type PublicStudentProps = {
	name: string
	phone?: string
}

interface StudentContextData {
	isErrored: boolean
	isLoading: boolean
	students: Student[]
	publishStudent: (student: PublicStudentProps) => Promise<void>
}

interface StudentProvider {
	children: ReactNode
}

const StudentContext = createContext<StudentContextData>({} as StudentContextData)

export function StudentProvider({ children }: StudentProvider) {
	const [students, setStudents] = useState<Student[]>([])
	const [isErrored, setIsErrored] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
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
							dayOfWeek {
								dayWeek
								numberWeek
							}
						}
					}
				}
				  
				`
				)

				setStudents(response.students)
			} catch {
				setIsErrored(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchStudents()
	}, [])

	async function publishStudent({ name, phone }: PublicStudentProps) {
		const graphcms = getGraphCMSClient()

		const { createStudent } = await graphcms.request(
			`mutation {
				createStudent(data: { name: "${name}", phone: "${phone}" }) {
					  id
					name
					phone
				}
			}`
		)

		await graphcms.request(
			`mutation {
				publishStudent(where: { id: "${createStudent.id}" }, to: PUBLISHED) {
					id
				}
			}`
		);
	}

	return (
		<StudentContext.Provider value={{ isLoading, isErrored, students, publishStudent }}>
			{children}
		</StudentContext.Provider>
	)
}

export const useStudents = () => useContext(StudentContext)