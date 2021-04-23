import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { colors } from '../styles/colors'

import { Home } from '../pages/Home'
import { Students } from '../pages/Students'
import fonts from '../styles/fonts'

const { Navigator, Screen } = createBottomTabNavigator()

export function BottomTabsRoutes() {

	return (
		<Navigator
			tabBarOptions={{
				labelPosition: 'beside-icon',
				activeTintColor: colors.blue,
				inactiveTintColor: colors.gray300,
				labelStyle: {
					fontFamily: fonts.complement
				},
				style: {
					height: 70,
				}
			}}
		>
			<Screen
				name="Agenda"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => <FeatherIcon name="calendar" color={color} size={24} />
				}}
			/>
			<Screen
				name="Alunos"
				component={Students}
				options={{
					tabBarIcon: ({ color }) => <FeatherIcon name="users" color={color} size={24} />
				}}
			/>
		</Navigator>
	)
}