import React, { useState } from 'react';
import { Lock, Mail, User, TrendingUp } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true); // Toggles between Sign Up and Login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Mock Authentication Logic
    if (isSignUp) {
      // Simulate saving user to local storage
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', name);
      alert('Account created successfully! You can now log in.');
      setIsSignUp(false); // Switch to login view automatically
    } else {
      // Simulate login check
      const savedEmail = localStorage.getItem('user_email');
      if (email === savedEmail || email === 'admin@dashboard.com') {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. (Hint: Try signing up first or use admin@dashboard.com)');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#111827',
      fontFamily: 'sans-serif',
      color: '#ffffff',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1F2937',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Dashboard Logo/Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#10B981', padding: '12px', borderRadius: '50%', marginBottom: '10px' }}>
            <TrendingUp size={28} color="#ffffff" />
          </div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>
            {isSignUp ? 'Create Vendor Account' : 'Vendor Dashboard Login'}
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '5px' }}>
            {isSignUp ? 'Sign up to manage your dynamic pricing' : 'Access your live pricing analytics'}
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div style={{ backgroundColor: '#EF4444', color: '#fff', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Full Name Input (Only shows up during Sign Up) */}
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#D1D5DB' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle} 
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#D1D5DB' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="vendor@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#D1D5DB' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            backgroundColor: '#10B981',
            color: '#ffffff',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '6px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.2s'
          }}>
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {/* View Switcher Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#9CA3AF' }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span 
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            style={{ color: '#10B981', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
            {isSignUp ? 'Log In' : 'Register Here'}
          </span>
        </div>

      </div>
    </div>
  );
}

// Reusable styling layout for inputs
const inputStyle = {
  width: '100%',
  backgroundColor: '#374151',
  border: '1px solid #4B5563',
  borderRadius: '6px',
  padding: '12px 12px 12px 40px',
  color: '#ffffff',
  fontSize: '14px',
  boxSizing: 'border-box',
  outline: 'none'
};