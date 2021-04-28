import React, { ComponentType } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonText } from './styles'

interface ButtonProps extends TouchableOpacityProps {
	icon?: ComponentType
	children: string
	color: string
}

export function Button({ children, color, icon: Icon, ...rest }: ButtonProps) {

	return (
		<Container
			style={{ backgroundColor: color }}
			activeOpacity={0.7}
			{...rest}
		>
			{Icon && <Icon />}
			<ButtonText>{children}</ButtonText>
		</Container>
	)
}