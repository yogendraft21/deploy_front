import { Link, Outlet, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, [userId, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <header className="header flex justify-between items-center px-4 py-3">
        <div>
          <div>
            <Link to="/">
              <p className="text-xl font-semibold">BlueOwls</p>
            </Link>
          </div>
        </div>
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <button
              onClick={() => navigate("/sign-in")}
              className="text-blue-600 hover:underline bg-transparent border border-blue-600 rounded-md px-4 py-2 transition-colors"
            >
              Sign In
            </button>
          </SignedOut>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
