import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonText } from './styles'

interface ButtonProps extends TouchableOpacityProps {
	children: string
	color: string
}

export function Button({ children, color, ...rest }: ButtonProps) {

	return (
		<Container {...rest} style={{ backgroundColor: color }}>
			<ButtonText>{children}</ButtonText>
		</Container>
	)
}