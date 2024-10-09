import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log("middleware")

    const path = request.nextUrl.pathname;
    const token = request.cookies.get('jwt')?.value||false;

    if(!token && path === '/dashboard1') {
        console.log("redirecting to login")
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/dashboard1'
    ]
}