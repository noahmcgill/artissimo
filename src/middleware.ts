import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - forgot-password (forgot password page)
         * - api/invite (QStash queue calls - authorization occurs in endpoint)
         */
        "/((?!_next/static|_next/image|favicon.ico|forgot-password|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
