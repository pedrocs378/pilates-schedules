import Constants from 'expo-constants'

import { ENV } from './ENV'

const getEnvVars = (env = Constants.manifest.releaseChannel) => {

	if (__DEV__) {
		return ENV.dev
	} else if (env === 'prod') {
		return ENV.prod
	} else {
		return ENV.dev
	}
}

export { getEnvVars }