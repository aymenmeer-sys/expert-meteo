"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComptePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

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

      <button 
        onClick={async () => {
          await authClient.signOut();
          router.push("/");
        }}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Se déconnecter
      </button>
    </div>
  );
}
