import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage({ onSignIn }) {
  const navigate = useNavigate();
  const [tab, setTab]       = useState("signin"); // "signin" | "signup"
  const [form, setForm]     = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validateSignIn = () => {
    const e = {};
    if (!form.email.includes("@"))     e.email    = "Enter a valid email address";
    if (form.password.length < 6)      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSignUp = () => {
    const e = {};
    if (!form.name.trim())             e.name     = "Full name is required";
    if (!form.email.includes("@"))     e.email    = "Enter a valid email address";
    if (!form.phone.match(/^\d{10}$/)) e.phone    = "Enter a valid 10-digit number";
    if (form.password.length < 6)      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    const valid = tab === "signin" ? validateSignIn() : validateSignUp();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSignIn) onSignIn({ name: form.name || form.email.split("@")[0], email: form.email });
      navigate("/");
    }, 1200);
  };

  return (
    <div className="signin-page">
      <div className="signin-left">
        <div className="signin-brand">
          <div className="signin-logo-icon">🌿</div>
          <span className="signin-logo-text">FreshMart</span>
        </div>
        <h2>Farm fresh groceries,<br />delivered to your door.</h2>
        <ul className="signin-perks">
          {[
            "🚚  Free delivery on orders above ₹499",
            "⭐  4.8-star rated service",
            "🌿  100% fresh & organic produce",
            "🔒  Secure payments",
          ].map(p => <li key={p}>{p}</li>)}
        </ul>
        <div className="signin-left-img" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop"
            alt="Fresh produce"
          />
        </div>
      </div>

      <div className="signin-right">
        <button className="signin-back" onClick={() => navigate("/")}>← Back to shop</button>

        <div className="signin-box">
          {/* Tabs */}
          <div className="signin-tabs">
            <button
              className={`signin-tab${tab === "signin" ? " active" : ""}`}
              onClick={() => { setTab("signin"); setErrors({}); }}
            >
              Sign In
            </button>
            <button
              className={`signin-tab${tab === "signup" ? " active" : ""}`}
              onClick={() => { setTab("signup"); setErrors({}); }}
            >
              Create Account
            </button>
          </div>

          <h3>{tab === "signin" ? "Welcome back 👋" : "Join FreshMart 🌿"}</h3>
          <p className="signin-sub">
            {tab === "signin"
              ? "Sign in to track orders, manage your wishlist and more."
              : "Create a free account and start shopping fresh today."}
          </p>

          <div className="signin-form">
            {/* Name — signup only */}
            {tab === "signup" && (
              <div className="signin-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ravi Kumar"
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
            )}

            {/* Email */}
            <div className="signin-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => update("email", e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Phone — signup only */}
            {tab === "signup" && (
              <div className="signin-field">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  value={form.phone}
                  onChange={e => update("phone", e.target.value)}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            )}

            {/* Password */}
            <div className="signin-field">
              <label>Password</label>
              <div className="password-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => update("password", e.target.value)}
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() => setShowPass(v => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {/* Confirm password — signup only */}
            {tab === "signup" && (
              <div className="signin-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => update("confirm", e.target.value)}
                  className={errors.confirm ? "error" : ""}
                />
                {errors.confirm && <span className="field-error">{errors.confirm}</span>}
              </div>
            )}

            {/* Forgot password — signin only */}
            {tab === "signin" && (
              <div style={{ textAlign: "right", marginTop: -6 }}>
                <button type="button" className="forgot-link">Forgot password?</button>
              </div>
            )}

            <button
              className={`signin-submit${loading ? " loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <span className="spinner" />
                : tab === "signin" ? "Sign In →" : "Create Account →"}
            </button>

            {/* Divider */}
            <div className="signin-divider"><span>or continue with</span></div>

            {/* Social */}
            <div className="signin-social">
              <button className="social-btn google-btn">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="social-btn phone-btn">
                📱 Mobile OTP
              </button>
            </div>
          </div>

          <p className="signin-footer-note">
            By continuing, you agree to FreshMart's{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
