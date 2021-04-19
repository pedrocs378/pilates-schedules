import React from 'react'

import { Container, ButtonText } from './styles'

interface ButtonProps {
	children: string
	color: string
}

export function Button({ children, color }: ButtonProps) {

	return (
		<Container style={{ backgroundColor: color }}>
			<ButtonText>{children}</ButtonText>
		</Container>
	)
}