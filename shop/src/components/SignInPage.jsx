import { useState } from "react";

const ADMIN_EMAIL = "sanjusudevan507@gmail.com";
const ADMIN_PASS  = "I AM SANJU 507";

// ✅ STEP 3 — Replace this with your actual Google Client ID
const GOOGLE_CLIENT_ID = "1085315118695-62kl5utsollr8lg9395tbm038l2ts7ie.apps.googleusercontent.com";

const TESTIMONIALS = [
  { text: "Best grocery delivery I've ever used. Everything arrives so fresh!", name: "Amruth P.", city: "Coimbatore", avatar: "P" },
  { text: "Love the quality. My family switched completely — no going back!", name: "Rahul M.", city: "Chennai",    avatar: "R" },
  { text: "Organic produce at such fair prices. FreshMart is a game changer.", name: "Ananya K.", city: "Bangalore", avatar: "A" },
];

const STATS = [
  { val: "200+", lbl: "Farms" },
  { val: "10K+", lbl: "Orders/week" },
  { val: "4.8★", lbl: "Rating" },
  { val: "50+",  lbl: "Cities" },
];

// Floating label input
function FloatInput({ id, type = "text", label, icon, value, onChange, onKeyDown, error, maxLength, suffix }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className={`si-field-wrap${error ? " si-field-err" : ""}`}>
      <div className={`si-field${focused ? " si-field-focused" : ""}${error ? " si-field-invalid" : ""}`}>
        <span className="si-field-ico">{icon}</span>
        <div className="si-field-inner">
          <label htmlFor={id} className={`si-label${lifted ? " si-label-up" : ""}`}>{label}</label>
          <input
            id={id}
            type={type}
            value={value}
            maxLength={maxLength}
            autoComplete="off"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        {suffix}
      </div>
      {error && <p className="si-err-msg">⚠ {error}</p>}
    </div>
  );
}

// Password field with show/hide + strength bar
function PasswordInput({ id, label, value, onChange, onKeyDown, error, showStrength }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const strength = !value ? 0
    : value.length < 6 ? 1
    : value.length < 10 && !/[A-Z]/.test(value) ? 2
    : value.length >= 10 && /[A-Z]/.test(value) && /[0-9]/.test(value) ? 4
    : 3;

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#e74c3c", "#f39c12", "#3498db", "#27ae60"];

  return (
    <div className={`si-field-wrap${error ? " si-field-err" : ""}`}>
      <div className={`si-field${focused ? " si-field-focused" : ""}${error ? " si-field-invalid" : ""}`}>
        <span className="si-field-ico">🔑</span>
        <div className="si-field-inner">
          <label htmlFor={id} className={`si-label${lifted ? " si-label-up" : ""}`}>{label}</label>
          <input
            id={id}
            type={show ? "text" : "password"}
            value={value}
            autoComplete="new-password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <button type="button" className="si-eye" onClick={() => setShow(v => !v)} tabIndex={-1}>
          {show
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </button>
      </div>
      {showStrength && value.length > 0 && (
        <div className="si-strength">
          <div className="si-strength-bars">
            {[1,2,3,4].map(i => (
              <div key={i} className="si-bar" style={{ background: i <= strength ? strengthColor[strength] : "#e0d8cc" }} />
            ))}
          </div>
          <span className="si-strength-lbl" style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
        </div>
      )}
      {error && <p className="si-err-msg">⚠ {error}</p>}
    </div>
  );
}

export default function SignInPage({ onSignIn }) {
  const [tab, setTab]         = useState("signin");
  const [form, setForm]       = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // ✅ NEW
  const [tIdx, setTIdx]       = useState(0);

  const upd = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };
  const switchTab = (t) => { setTab(t); setErrors({}); setForm({ name: "", email: "", phone: "", password: "", confirm: "" }); };

  const validate = () => {
    const e = {};
    if (tab === "signup" && !form.name.trim())              e.name     = "Full name is required";
    if (!form.email.includes("@"))                          e.email    = "Enter a valid email address";
    if (tab === "signup" && !form.phone.match(/^\d{10}$/)) e.phone    = "Enter a valid 10-digit number";
    if (form.password.length < 6)                           e.password = "Minimum 6 characters";
    if (tab === "signup" && form.password !== form.confirm) e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const email = form.email.trim().toLowerCase();
      if (tab === "signin" && email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
        onSignIn({ name: "Admin", email: ADMIN_EMAIL, isAdmin: true });
        return;
      }
      onSignIn({ name: form.name.trim() || email.split("@")[0], email, isAdmin: false });
    }, 1200);
  };

  // ✅ NEW — Google Login handler
  const handleGoogleLogin = () => {
    // Check if the Google script has loaded
    if (!window.google) {
      alert("Google Sign-In is not loaded yet. Please refresh the page.");
      return;
    }

    setGoogleLoading(true);

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        try {
          // Decode the JWT token Google returns
          const base64Payload = response.credential.split(".")[1];
          const payload = JSON.parse(atob(base64Payload));

          // payload contains: name, email, picture, sub (unique Google ID)
          const isAdmin = payload.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

          onSignIn({
            name:    payload.name,
            email:   payload.email,
            avatar:  payload.picture,  // Google profile picture URL
            isAdmin: isAdmin,
          });
        } catch (err) {
          alert("Google Sign-In failed. Please try again.");
        } finally {
          setGoogleLoading(false);
        }
      },
    });

    // Show the Google One Tap / popup
    window.google.accounts.id.prompt((notification) => {
      // If the One Tap popup was dismissed or skipped
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setGoogleLoading(false);
      }
    });
  };

  const t = TESTIMONIALS[tIdx];

  return (
    <div className="si-root">

      {/* ════════════ LEFT PANEL ════════════ */}
      <div className="si-left">
        <div className="si-bg" />
        <div className="si-orb si-orb-1" />
        <div className="si-orb si-orb-2" />
        <div className="si-orb si-orb-3" />
        <div className="si-overlay" />

        <div className="si-left-inner">
          <div className="si-badge">
            <span className="si-badge-dot" />
            Trusted by 50,000+ families across India
          </div>

          <h1 className="si-headline">
            Farm-fresh<br />
            <span className="si-headline-hl">groceries</span><br />
            at your door.
          </h1>
          <p className="si-sub">Straight from 200+ farms across South India — handpicked, quality-checked, and delivered the same day.</p>

          <div className="si-tcard">
            <div className="si-tcard-quote">"</div>
            <p className="si-tcard-text">{t.text}</p>
            <div className="si-tcard-author">
              <div className="si-tcard-avatar">{t.avatar}</div>
              <div>
                <div className="si-tcard-name">{t.name}</div>
                <div className="si-tcard-city">📍 {t.city}</div>
              </div>
              <div className="si-tcard-stars">★★★★★</div>
            </div>
            <div className="si-tdots">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={`si-tdot${i === tIdx ? " si-tdot-active" : ""}`} onClick={() => setTIdx(i)} />
              ))}
            </div>
          </div>

          <div className="si-stats">
            {STATS.map(s => (
              <div className="si-stat" key={s.lbl}>
                <div className="si-stat-val">{s.val}</div>
                <div className="si-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════ RIGHT PANEL ════════════ */}
      <div className="si-right">
        <div className="si-stripe" />

        <div className="si-form-wrap">
          <div className="si-logo">
            <div className="si-logo-leaf">🌿</div>
            <span>FreshMart</span>
          </div>

          <div className="si-tabs">
            {["signin", "signup"].map(t2 => (
              <button
                key={t2}
                className={`si-tab${tab === t2 ? " si-tab-on" : ""}`}
                onClick={() => switchTab(t2)}
              >
                {t2 === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="si-heading">
            <h2>{tab === "signin" ? "Welcome back 👋" : "Join FreshMart 🌿"}</h2>
            <p>{tab === "signin"
              ? "Sign in to shop, track orders & access your wishlist."
              : "Create a free account and start shopping fresh today."
            }</p>
          </div>

          {tab === "signup" && (
            <FloatInput id="name" label="Full Name" icon="👤" value={form.name}
              onChange={e => upd("name", e.target.value)} error={errors.name} />
          )}

          <FloatInput id="email" label="Email Address" icon="✉️" type="email" value={form.email}
            onChange={e => upd("email", e.target.value)}
            onKeyDown={e => tab === "signin" && e.key === "Enter" && handleSubmit()}
            error={errors.email} />

          {tab === "signup" && (
            <FloatInput id="phone" label="Mobile Number" icon="📱" type="tel" maxLength={10} value={form.phone}
              onChange={e => upd("phone", e.target.value)} error={errors.phone} />
          )}

          <PasswordInput id="pass" label="Password" value={form.password}
            onChange={e => upd("password", e.target.value)}
            onKeyDown={e => tab === "signin" && e.key === "Enter" && handleSubmit()}
            error={errors.password}
            showStrength={tab === "signup"} />

          {tab === "signup" && (
            <PasswordInput id="confirm" label="Confirm Password" value={form.confirm}
              onChange={e => upd("confirm", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              error={errors.confirm} />
          )}

          {tab === "signin" && (
            <div className="si-forgot-row">
              <button type="button" className="si-forgot">Forgot password?</button>
            </div>
          )}

          <button
            className={`si-submit${loading ? " si-submit-busy" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="si-spin" />
            ) : (
              <>
                <span>{tab === "signin" ? "Sign In" : "Create Account"}</span>
                <span className="si-submit-arrow">→</span>
              </>
            )}
            <div className="si-shimmer" />
          </button>

          <div className="si-divider"><span>or continue with</span></div>

          {/* ✅ UPDATED — Google button now calls handleGoogleLogin */}
          <div className="si-socials">
            <button
              className="si-social"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              style={{ opacity: googleLoading ? 0.7 : 1, cursor: googleLoading ? "wait" : "pointer" }}
            >
              {googleLoading ? (
                // Small spinner while Google popup loads
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ animation: "spin 1s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {googleLoading ? "Opening Google..." : "Google"}
            </button>

            {/* Mobile OTP button — unchanged */}
            <button className="si-social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a3a2a" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
              </svg>
              Mobile OTP
            </button>
          </div>

          <div className="si-trust">
            <span>🔒 SSL Secure</span>
            <span>⚡ Instant Access</span>
            <span>🌿 No spam</span>
          </div>

          <p className="si-terms">
            By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* ✅ Spinner keyframe — needed for the Google loading spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
