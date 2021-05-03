import { GraphQLClient } from 'graphql-request'

import { getEnvVars } from '../../environment'

const { graphCMSEndpoint, graphCMSAccessToken } = getEnvVars()

export function getGraphCMSClient() {
	const client = new GraphQLClient(graphCMSEndpoint, {
		headers: {
			authorization: `Bearer ${graphCMSAccessToken}`
		}
	})

	return client
}