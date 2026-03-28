import { createContext, useContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SessionResponse, SessionUser, UpdateProfileInput } from "@/lib/contracts";
import { api, getErrorMessage } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";

interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: UpdateProfileInput) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({
    queryKey: queryKeys.session,
    retry: false,
    queryFn: () => api.getSession(),
  });

  const setSession = async (session: SessionResponse) => {
    queryClient.setQueryData(queryKeys.session, session);
    await queryClient.invalidateQueries({ queryKey: queryKeys.groups });
  };

  const signIn = async (email: string, password: string) => {
    try {
      const session = await api.login(email, password);
      await setSession(session);
      return {};
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const session = await api.register(email, password, fullName);
      await setSession(session);
      return {};
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  };

  const signOut = async () => {
    const session = await api.logout();
    queryClient.setQueryData(queryKeys.session, session);
    queryClient.removeQueries({ queryKey: queryKeys.groups });
    queryClient.removeQueries({ queryKey: ["inventory"] });
  };

  const updateProfile = async (updates: UpdateProfileInput) => {
    try {
      const session = await api.updateProfile(updates);
      await setSession(session);
      return {};
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: sessionQuery.data?.user ?? null,
        loading: sessionQuery.isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
