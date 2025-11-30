import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, List } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  // Unified badge count from any schema shape:
  // - prefer authUser.badgeCount (int)
  // - else use authUser.badges.length (array)
  // - else fallback to legacy authUser.badge (int)
  const badgeCount =
    authUser?.badgeCount ??
    (Array.isArray(authUser?.badges) ? authUser.badges.length : undefined) ??
    authUser?.badge ??
    0;

  // Show Posts link only if user is logged in AND has 3+ badges
  const canSeePosts = (badgeCount ?? 0) >= 3;

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">Play to Secure</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {!authUser && (
              <Link to={"/admin"} className="btn btn-sm gap-2 transition-colors">
                <User className="size-5" />
                <span className="hidden sm:inline">Admin Login</span>
              </Link>
            )}

            {authUser && (
              <>
                {/* Posts (only if 3+ badges) */}
                {canSeePosts && (
                  <Link to={"/posts"} className="btn btn-sm gap-2 transition-colors">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Posts</span>
                  </Link>
                )}

                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <Link to={"/leaderboard"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Link>
                <Link to={"/level2"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Level2</span>
                </Link>
                
                


                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
