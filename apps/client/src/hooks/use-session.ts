import { authClient } from "@/lib/auth-client";
import type { Session, User } from "better-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SessionResponse = {
  user: User;
  session: Session;
};

export const useSession = () => {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const { data } = await authClient.getSession();
        setSession(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An Unknown Error Has Occured";
        setError(errorMessage);
        toast(`Failed To Fetch Session: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  return { session, loading, error };
};
