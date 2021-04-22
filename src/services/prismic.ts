import Prismic from '@prismicio/client'

export function getPrismicClient() {
	const prismic = Prismic.client('https://pilates-schedules-dev.cdn.prismic.io/api/v2')

	return prismic
}