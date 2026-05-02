import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplet, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');

    if (isLogin) {
      // Login Logic
      if (email === "admin@gmail.com" && password === "admin123") {
        navigate("/home");
      } else {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          navigate("/home");
        } else {
          alert("❌ Invalid credentials! Please check your email and password.");
        }
      }
    } else {
      // Sign Up Logic
      if (users.find(u => u.email === email)) {
        alert("⚠️ Account already exists with this email. Please log in.");
        return;
      }
      users.push({ email, password });
      localStorage.setItem('mockUsers', JSON.stringify(users));
      alert("✅ Account created successfully! Logging you in...");
      navigate("/home");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#020202",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    fontFamily: "'Outfit', sans-serif",
    color: "white"
  };

  return (
    <div style={containerStyle} className="login-full-page-v4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

        .login-full-page-v4 * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .login-bg-decoration {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #020202 100%);
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s infinite alternate;
          opacity: 0.4;
        }

        .blob-1 {
          width: 400px;
          height: 400px;
          background: #e11d48;
          top: -100px;
          left: -100px;
        }

        .blob-2 {
          width: 300px;
          height: 300px;
          background: #9f1239;
          bottom: -50px;
          right: -50px;
          animation-delay: -5s;
        }

        @keyframes float {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(50px, 100px) scale(1.1); }
        }

        .login-glass-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          animation: boxReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-box-v4 {
          background: rgba(20, 20, 25, 0.7) !important;
          backdrop-filter: blur(40px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 32px !important;
          padding: 3.5rem 2.5rem !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          text-align: center !important;
        }

        @keyframes boxReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-logo-circle {
          width: 64px;
          height: 64px;
          background: #e11d48;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3);
        }

        .login-box-v4 h1 {
          font-size: 2.5rem !important;
          font-weight: 800 !important;
          margin-bottom: 0.5rem !important;
          background: linear-gradient(to right, #fff, #94a3b8) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: white !important;
          text-shadow: none !important;
          letter-spacing: -1px !important;
        }

        .login-box-v4 p.tagline {
          color: #94a3b8 !important;
          font-size: 1.1rem !important;
          margin-bottom: 2.5rem !important;
          background: none !important;
          -webkit-text-fill-color: initial !important;
        }

        .login-form-v4 {
          display: flex !important;
          flex-direction: column !important;
          gap: 1.25rem !important;
          background: none !important;
          padding: 0 !important;
          box-shadow: none !important;
          width: 100% !important;
        }

        .input-field-v4 {
          position: relative !important;
          width: 100% !important;
        }

        .input-field-v4 svg {
          position: absolute !important;
          left: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #64748b !important;
          z-index: 2 !important;
        }

        .input-field-v4 input {
          width: 100% !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 16px !important;
          padding: 16px 16px 16px 48px !important;
          color: white !important;
          font-size: 1rem !important;
          outline: none !important;
          transition: 0.3s !important;
          margin: 0 !important;
        }

        .input-field-v4 input:focus {
          border-color: #e11d48 !important;
          background: rgba(225, 29, 72, 0.05) !important;
          box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1) !important;
        }

        .login-cta-v4 {
          background: #e11d48 !important;
          color: white !important;
          border: none !important;
          border-radius: 16px !important;
          padding: 18px !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          transition: 0.3s !important;
          margin-top: 0.5rem !important;
          width: 100% !important;
          box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3) !important;
        }

        .login-cta-v4:hover {
          background: #be123c !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 15px 25px rgba(225, 29, 72, 0.4) !important;
        }

        .login-footer-v4 {
          margin-top: 2.5rem !important;
          font-size: 0.9rem !important;
          color: #64748b !important;
        }

        .login-footer-v4 p {
          color: #64748b !important;
        }

        .login-footer-v4 span {
          color: #94a3b8 !important;
          font-family: monospace !important;
          font-weight: 600 !important;
        }
      `}</style>

      <div className="login-bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="login-glass-container">
        <div className="login-box-v4">
          <div className="login-logo-circle">
            <Droplet size={32} fill="white" color="white" />
          </div>
          <h1>LifeLine</h1>
          <p className="tagline">
            {isLogin ? "Every drop counts. Sign in to save lives." : "Join our community. Create an account today."}
          </p>

          <form className="login-form-v4" onSubmit={handleSubmit}>
            <div className="input-field-v4">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field-v4">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-cta-v4">
              {isLogin ? "Log In" : "Create Account"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-footer-v4">
            <p 
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: "pointer", color: "#e11d48", fontWeight: "600", marginBottom: "12px", transition: "0.3s" }}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
            {isLogin && <p>Demo: <span>admin@gmail.com / admin123</span></p>}
          </div>
        </div>
      </div>
    </div>
  );
}
