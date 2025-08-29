import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Lock, User, Shield, MessageSquare, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ADMIN_USER ="admin"
const ADMIN_PASS = "admin12"

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
      navigate("/admin/quiz", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoggingIn(true);
    setError("");

    setTimeout(() => {
      const ok =
        formData.username.trim() === ADMIN_USER &&
        formData.password === ADMIN_PASS;

      if (ok) {
        localStorage.setItem("isAdminLoggedIn", "true");
        setIsLoggingIn(false);
        navigate("/admin/quiz", { replace: true });
      } else {
        setIsLoggingIn(false);
        setError("Invalid username or password");
      }
    }, 600);
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleSubmit();

  const envMissing = !ADMIN_USER || !ADMIN_PASS;

  return (
    <div className="h-screen flex">
      <div className="flex flex-col justify-center items-center flex-1 p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-4">Admin Portal</h1>
              <p className="text-base-content/60">Quiz Management System</p>
            </div>
          </div>

          {envMissing && (
            <div className="alert alert-warning">
              <AlertTriangle className="w-5 h-5" />
              <span>
                Admin creds not set in <code>.env</code>. Add <code>VITE_ADMIN_USER</code> and <code>VITE_ADMIN_PASS</code> then restart dev server.
              </span>
            </div>
          )}

          {error && <div className="alert alert-error"><span>{error}</span></div>}

          <div className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Username</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5 text-base-content/40" /> : <Eye className="h-5 w-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (<><Loader2 className="h-5 w-5 animate-spin" />Signing in...</>) : ("Sign in to Dashboard")}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-32 h-32 text-primary/20 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-base-content/80 mb-4">Quiz Management</h2>
          <p className="text-base-content/60 max-w-md">
            Create and manage quiz questions for your users. Build engaging quizzes with multiple categories and difficulty levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
