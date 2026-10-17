"use client";

import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ComptePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState(false);

  useEffect(() => {
    if (!isPending && !session && !isSigningOut) {
      router.replace("/sign-in");
    }
  }, [session, isPending, isSigningOut, router]);

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setSignOutError(false);

    try {
      const result = await authClient.signOut();
      if (result.error) {
        throw new Error("Sign-out failed");
      }
      window.location.replace("/");
    } catch (error) {
      console.error("[v0] Sign-out failed", error);
      setIsSigningOut(false);
      setSignOutError(true);
    }
  }, [isSigningOut]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <p>Chargement de votre compte...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-10 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Mon Compte</h1>
      
      <div className="bg-slate-800 p-6 rounded-xl space-y-4">
        <p><strong>Email :</strong> {session.user.email}</p>
        <p><strong>Nom :</strong> {session.user.name}</p>
      </div>

      {signOutError && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          La déconnexion a échoué. Réessayez.
        </p>
      )}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSigningOut ? "Déconnexion…" : "Se déconnecter"}
      </button>
    </div>
  );
}
