import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { colors } from '../styles/colors'

import { Home } from '../pages/Home'
import { Students } from '../pages/Students'

const { Navigator, Screen } = createBottomTabNavigator()

export function BottomTabsRoutes() {

	return (
		<Navigator
			tabBarOptions={{
				showLabel: false,
				activeTintColor: colors.blue,
				inactiveTintColor: colors.gray300
			}}
		>
			<Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => <FeatherIcon name="calendar" color={color} size={22} />
				}}
			/>
			<Screen
				name="Students"
				component={Students}
				options={{
					tabBarIcon: ({ color }) => <FeatherIcon name="users" color={color} size={22} />
				}}
			/>
		</Navigator>
	)
}