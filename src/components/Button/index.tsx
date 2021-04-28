import React, { ComponentType } from 'react'
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'

import { Container, ButtonText } from './styles'

interface ButtonProps extends TouchableOpacityProps {
	icon?: ComponentType
	children: string
	color: string
}

export function Button({ children, color, icon: Icon, ...rest }: ButtonProps) {

	return (
		<Container {...rest} style={{ backgroundColor: color }}>
			{Icon && <Icon />}
			<ButtonText>{children}</ButtonText>
		</Container>
	)
}