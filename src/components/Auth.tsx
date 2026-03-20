import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LogOut } from "lucide-react";

export function Auth({ user }: { user: any }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}
