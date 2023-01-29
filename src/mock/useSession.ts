import { env } from "@/env/client.mjs";
import {
  useSession as useNextAuthSession,
  type SessionContextValue,
  type UseSessionOptions,
} from "next-auth/react";
import { getMockSession } from "./mockSession";

export const useSession = <R extends boolean>(
  options?: UseSessionOptions<R>
):
  | SessionContextValue<R>
  | { readonly data: null; readonly status: "loading" } => {
  /* eslint-disable react-hooks/rules-of-hooks */

  const mockedRole = env.NEXT_PUBLIC_MOCK_ROLE;

  if (mockedRole == null) {
    return useNextAuthSession(options);
  }

  const session = getMockSession(mockedRole);
  if (session == null) {
    return { data: null, status: "loading" };
  }

  return {
    data: session,
    status: "authenticated",
  } as SessionContextValue<R>;
};