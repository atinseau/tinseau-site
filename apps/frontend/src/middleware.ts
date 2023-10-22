// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')
	const home = new URL('/', request.url)

	if (!token || !token.value)
		return NextResponse.redirect(home)

	const data = await fetch(process.env.SERVER_API + "/users/me", {
		headers: {
			Authorization: "Bearer " + token.value
		}
	})

	if (data.status === 401) {
		const response =  NextResponse.redirect(home, {
			headers: {
				cookie: request.headers.get('cookie') || ''
			}
		}) 
		response.cookies.delete('token')
		return response
	}
	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/my-account/:path*',
}