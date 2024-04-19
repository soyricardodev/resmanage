import "server-only";

import { cache } from "react";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  const cookie = cookies().toString();
  heads.set("cookie", cookie);

  const urlTest =
    process.env.VERCEL_URL != null
      ? `https://${process.env.VERCEL_URL}`
      : `http://127.0.0.1:${process.env.PORT ?? 3000}`;

  return createTRPCContext({
    headers: heads,
    auth: getAuth(new NextRequest(urlTest, { headers: heads })),
  });
});

export const api = createCaller(createContext);
