import React from 'react'

import runnerAnimation from '../../assets/runner.json'

import { Container, Animation } from './styles'

export function Load() {

	return (
		<Container>
			<Animation
				source={runnerAnimation}
				autoPlay
				loop
			/>
		</Container>
	)
}