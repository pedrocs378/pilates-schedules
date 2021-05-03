interface EnvironmentProps {
	dev: {
		graphCMSEndpoint: string
		graphCMSAccessToken: string
	},
	prod: {
		graphCMSEndpoint: string
		graphCMSAccessToken: string
	}
}

export const ENV = {
	dev: {
		graphCMSEndpoint: '',
		graphCMSAccessToken: '',

	},
	prod: {
		graphCMSEndpoint: '',
		graphCMSAccessToken: ''
	}
} as EnvironmentProps