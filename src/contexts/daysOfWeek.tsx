import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

import { getGraphCMSClient } from "../services/graphcms";

interface DayOfWeek {
	id: string
	numberWeek: number
	dayWeek: string
}

interface DaysOfWeekProviderProps {
	children: ReactNode
}

const DaysOfWeekContext = createContext<DayOfWeek[]>([])

export function DaysOfWeekProvider({ children }: DaysOfWeekProviderProps) {
	const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([])

	useEffect(() => {
		async function fetchDaysofWeek() {
			try {
				const graphcms = getGraphCMSClient()

				const { dayOfWeeks } = await graphcms.request(
					`
				{
					dayOfWeeks {
						id
						numberWeek
						dayWeek
					}
				}
				  
				`
				)

				setDaysOfWeek(dayOfWeeks)
			} catch {
				ToastAndroid.show('Erro ao carregar dados', ToastAndroid.LONG)
			}
		}

		fetchDaysofWeek()
	}, [])

	return (
		<DaysOfWeekContext.Provider value={daysOfWeek}>
			{children}
		</DaysOfWeekContext.Provider>
	)
}

export const useDaysOfWeek = () => useContext(DaysOfWeekContext)