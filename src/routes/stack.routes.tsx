import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ClassSchedule } from '../pages/ClassSchedule'
import { BottomTabsRoutes } from './bottomTabs.routes'

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {

	return (
		<Navigator
			initialRouteName="HomeTabs"
			screenOptions={{ headerShown: false }}
		>
			<Screen name="HomeTabs" component={BottomTabsRoutes} />

			<Screen
				name="ClassSchedule"
				component={ClassSchedule}
			/>
		</Navigator>
	)
}