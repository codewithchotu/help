import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplet, Mail, Lock, ArrowRight, Loader, Eye, EyeOff } from "lucide-react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export default function LoginPageComponent() {
  const [view, setView]           = useState("main");   // "main" | "email"
  const [isSignUp, setIsSignUp]   = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [gLoading, setGLoading]   = useState(false);
  const [error, setError]         = useState("");
  const navigate = useNavigate();

  const friendlyError = (code) => {
    switch (code) {
      case "auth/user-not-found":        return "No account found with this email.";
      case "auth/wrong-password":        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":  return "Email already registered. Please log in.";
      case "auth/weak-password":         return "Password must be at least 6 characters.";
      case "auth/invalid-email":         return "Please enter a valid email address.";
      case "auth/too-many-requests":     return "Too many attempts. Try again later.";
      case "auth/invalid-credential":    return "Invalid email or password.";
      case "auth/popup-closed-by-user":  return "Google sign-in was cancelled.";
      default:                           return "Something went wrong. Please try again.";
    }
  };

  // ── Google Sign-In ────────────────────────────────────────────────────────
  const handleGoogle = async () => {
    setError("");
    setGLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      setError(friendlyError(err.code));
    }
    setGLoading(false);
  };

  // ── Email / Password ──────────────────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home");
    } catch (err) {
      setError(friendlyError(err.code));
    }
    setLoading(false);
  };

  return (
    <div className="ll-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ll-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #06060a;
          font-family: 'Outfit', sans-serif;
          color: #fff;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient blobs */
        .ll-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
          pointer-events: none;
        }
        .ll-blob-1 { width: 500px; height: 500px; background: #e11d48; top: -180px; left: -180px; animation: blobFloat 18s infinite alternate; }
        .ll-blob-2 { width: 350px; height: 350px; background: #9f1239; bottom: -120px; right: -120px; animation: blobFloat 22s infinite alternate-reverse; }
        @keyframes blobFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(60px, 80px) scale(1.1); }
        }

        /* Card */
        .ll-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: rgba(18, 18, 24, 0.75);
          backdrop-filter: blur(40px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 28px;
          padding: 2.8rem 2.2rem;
          box-shadow: 0 30px 60px -10px rgba(0,0,0,0.6);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Logo */
        .ll-logo {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #e11d48, #9f1239);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.2rem;
          box-shadow: 0 8px 24px rgba(225,29,72,0.35);
        }

        .ll-title {
          font-size: 1.9rem;
          font-weight: 800;
          text-align: center;
          letter-spacing: -0.5px;
          background: linear-gradient(to right, #fff 60%, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.3rem;
        }
        .ll-subtitle {
          text-align: center;
          color: #64748b;
          font-size: 0.92rem;
          margin-bottom: 1.8rem;
        }

        /* Social buttons */
        .ll-social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #e2e8f0;
          font-size: 0.97rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          margin-bottom: 10px;
          font-family: 'Outfit', sans-serif;
        }
        .ll-social-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .ll-social-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Divider */
        .ll-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.2rem 0;
          color: #334155;
          font-size: 0.85rem;
        }
        .ll-divider::before, .ll-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        /* Email link button */
        .ll-email-link {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #e11d48;
          font-size: 0.97rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'Outfit', sans-serif;
        }
        .ll-email-link:hover {
          background: rgba(225,29,72,0.08);
          border-color: rgba(225,29,72,0.3);
          transform: translateY(-1px);
        }

        /* Email form */
        .ll-form { display: flex; flex-direction: column; gap: 12px; }

        .ll-input-wrap {
          position: relative;
        }
        .ll-input-wrap svg.ll-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
        }
        .ll-input-wrap input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #fff;
          font-size: 0.97rem;
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: 0.25s;
        }
        .ll-input-wrap input::placeholder { color: #475569; }
        .ll-input-wrap input:focus {
          border-color: #e11d48;
          background: rgba(225,29,72,0.04);
          box-shadow: 0 0 0 3px rgba(225,29,72,0.12);
        }
        .ll-eye-btn {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }
        .ll-eye-btn:hover { color: #94a3b8; }

        /* Submit */
        .ll-submit {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #e11d48, #9f1239);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.25s;
          box-shadow: 0 8px 20px rgba(225,29,72,0.3);
          margin-top: 2px;
        }
        .ll-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(225,29,72,0.4);
        }
        .ll-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Error */
        .ll-error {
          background: rgba(225,29,72,0.1);
          border: 1px solid rgba(225,29,72,0.3);
          border-radius: 12px;
          padding: 11px 14px;
          color: #fca5a5;
          font-size: 0.88rem;
        }

        /* Back link */
        .ll-back {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.88rem;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          padding: 0;
          margin-top: 1.4rem;
          display: block;
          width: 100%;
          text-align: center;
          transition: color 0.2s;
        }
        .ll-back:hover { color: #94a3b8; }

        /* Toggle sign up / login */
        .ll-toggle {
          margin-top: 1.2rem;
          text-align: center;
          color: #64748b;
          font-size: 0.88rem;
        }
        .ll-toggle span {
          color: #e11d48;
          font-weight: 600;
          cursor: pointer;
          -webkit-text-fill-color: #e11d48;
        }
        .ll-toggle span:hover { opacity: 0.8; }

        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Ambient blobs */}
      <div className="ll-blob ll-blob-1" />
      <div className="ll-blob ll-blob-2" />

      <div className="ll-card">
        {/* Logo + heading */}
        <div className="ll-logo">
          <Droplet size={28} fill="white" color="white" />
        </div>
        <h1 className="ll-title">LifeLine</h1>
        <p className="ll-subtitle">
          {view === "email"
            ? (isSignUp ? "Create your account" : "Sign in with your email")
            : "Every drop counts. Sign in to save lives."}
        </p>

        {error && <div className="ll-error" style={{ marginBottom: "14px" }}>⚠️ {error}</div>}

        {/* ── MAIN VIEW ── */}
        {view === "main" && (
          <>
            {/* Google */}
            <button className="ll-social-btn" onClick={handleGoogle} disabled={gLoading}>
              {gLoading ? (
                <Loader size={18} className="spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {gLoading ? "Signing in…" : "Log in with Google"}
            </button>

            {/* Divider */}
            <div className="ll-divider">or</div>

            {/* Email option */}
            <button
              className="ll-email-link"
              onClick={() => { setView("email"); setIsSignUp(false); setError(""); }}
            >
              <Mail size={18} />
              Log in with Email
            </button>

            <div className="ll-toggle" style={{ marginTop: "1.4rem" }}>
              No account yet?{" "}
              <span onClick={() => { setView("email"); setIsSignUp(true); setError(""); }}>
                Sign up
              </span>
            </div>
          </>
        )}

        {/* ── EMAIL VIEW ── */}
        {view === "email" && (
          <form className="ll-form" onSubmit={handleEmailSubmit}>
            <div className="ll-input-wrap">
              <Mail size={17} className="ll-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="ll-input-wrap">
              <Lock size={17} className="ll-icon" />
              <input
                type={showPass ? "text" : "password"}
                placeholder={isSignUp ? "Password (min 6 chars)" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              <button
                type="button"
                className="ll-eye-btn"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <button type="submit" className="ll-submit" disabled={loading}>
              {loading
                ? <><Loader size={17} className="spin" /> Please wait…</>
                : <>{isSignUp ? "Create Account" : "Log In"} <ArrowRight size={17} /></>
              }
            </button>

            <div className="ll-toggle">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span onClick={() => { setIsSignUp(!isSignUp); setError(""); }}>
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </div>

            <button type="button" className="ll-back" onClick={() => { setView("main"); setError(""); }}>
              ← Back to all sign-in options
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
