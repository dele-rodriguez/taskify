import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse , NextRequest} from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/paystack/webhook"], // Add your public routes here
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/paystack/webhook') {
    req.headers.set('x-disable-body-parser', 'true');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)", // Exclude static files and public routes
    "/",
    "/(api|trpc)(.*)",
    '/api/paystack/webhook',
  ],
};
