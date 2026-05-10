import type { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// 未認証ならログインへ飛ばすパス (文字列は前方一致、正規表現は test で判定)
const PROTECTED_PATHS: (string | RegExp)[] = ["/articles/new", /^\/articles\/[^/]+\/edit$/];
// 認証済みならホームへ飛ばすパス
const GUEST_ONLY_PATHS = ["/login", "/signup"];
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((p) =>
    typeof p === "string" ? pathname === p || pathname.startsWith(`${p}/`) : p.test(pathname),
  );
  const isGuestOnly = GUEST_ONLY_PATHS.some((p) => pathname === p);
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (user && isGuestOnly) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}
