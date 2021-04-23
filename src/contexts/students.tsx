import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getGraphCMSClient } from '../services/graphcms'

interface StudentSchedules {
	id: string
	time: Date
	dayOfWeek: {
		dayWeek: string
		numberWeek: number
	}
}

interface Student {
	id: string
	name: string
	phone: string
	schedules: StudentSchedules[]
}

interface StudentContextData {
	isErrored: boolean
	isLoading: boolean
	students: Student[]
}

interface StudentProvider {
	children: ReactNode
}

const StudentContext = createContext<StudentContextData>({} as StudentContextData)

export function StudentProvider({ children }: StudentProvider) {
	const [isErrored, setIsErrored] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [students, setStudents] = useState<Student[]>([])

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

	return (
		<StudentContext.Provider value={{ isLoading, isErrored, students }}>
			{children}
		</StudentContext.Provider>
	)
}

export const useStudents = () => useContext(StudentContext)