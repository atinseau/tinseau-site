import { gql } from "@apollo/client";

const USER_CHUNK = (key: string) =>  `
${key} {
	id
	username
	email
}
`

const ME_QUERY = gql`
query {
	${USER_CHUNK('me')}
}
`

const LOGIN_QUERY = gql`
mutation ($email: String!, $password: String!) {
	login (input: {
		identifier: $email,
		password: $password
	}) {
		jwt
		${USER_CHUNK("user")}
	}
}
`

const REGISTER_QUERY = gql`
mutation ($username: String!, $email: String!, $password: String!) {
	register (input: {
		username: $username,
		email: $email,
		password: $password
	}) {
		jwt
		${USER_CHUNK("user")}
	}
}
`

export {
	LOGIN_QUERY,
	REGISTER_QUERY,
	ME_QUERY
}