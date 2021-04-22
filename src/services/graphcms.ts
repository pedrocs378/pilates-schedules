import { GraphQLClient } from 'graphql-request'

type PublicStudentProps = {
	name: string
	phone?: string
}

export function getGraphCMSClient() {
	const client = new GraphQLClient('https://api-ca-central-1.graphcms.com/v2/cknsaorj80lmm01wj82fp39i4/master', {
		headers: {
			authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MTkxMjE1OTYsImF1ZCI6WyJodHRwczovL2FwaS1jYS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrbnNhb3JqODBsbW0wMXdqODJmcDM5aTQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYTM4MTM2YjMtYTRjOS00ZTk2LWExYzQtZTg1MjQwMDExOGQ0IiwianRpIjoiY2tudGI2enB6YWFmMjAxeXQzdXl4MXV0biJ9.gWc9PNeR9j8pOjljlMZKOuMAUh4VGoZV3QBuvqOo-aKW1-bbhIsZV8g-XdL2s0WKxLuvkm9hJ-u9tqPyUIXM0Ry7EexLTnrchkEoSR056w0UgmBWMjL3PO7zmiBikXl3z9n-vZ_NopR1fV4q3hW05LyHL779_PFvoSDZrzpIjH3IRRY2Ge_Fy3haUfb1b4_j0VEnl3AlESAdp0ksWbpxo569NoCUk38-W-P4xvR5TVmNqKQeU36bDQis_Vn4VUL1LIjFTTejghH_s83JVuG1-xZHnUWBbYabv9uQcAVmhkZceo40ihFf3NMNARbBojaO5Cf-WFUxWP64zWoHvtkRNmB1V1SeaTNpqFw8TdqcaYI4wbK-BcQ6vDlzCHtgmwp-zk9Fm2NIrRca6fybM0RlWASvSEmsKwVGtIXAWGGx8UruO400Q_NTWOzNhrYjTD45qu-SXnzanu_y-AH277ibwWSwWkOQnVL5ueRj5iY5yjZJwNWXS7_E5s8O-jSZhuRtronBN1WNNH9kRscIauiL6Vw-uQyAzhFEitNbbl1jjC1HDVSA58xO3JuQekZnIDv2xYUuNJBdvLD1ASEsNg9GP7p3z1tvuB2nvfVvrweqwRRcObkLc9VWVSgJSezWFdUIxyRddaiCseF9L9mHxS6HRlExJvBrQJ0i5l8VuR9M3TU'
		}
	})

	return client
}

export async function publishStudent({ name, phone }: PublicStudentProps) {
	const graphcms = getGraphCMSClient()

	const { createStudent } = await graphcms.request(
		`mutation {
			createStudent(data: { name: "${name}", phone: "${phone}" }) {
			  	id
				name
				phone
			}
		}`
	)

	await graphcms.request(
		`mutation {
			publishStudent(where: { id: "${createStudent.id}" }, to: PUBLISHED) {
				id
			}
		}`
	);

	return {
		id: createStudent.id,
		name: createStudent.name,
		phone: createStudent.phone
	}
}