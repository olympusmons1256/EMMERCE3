import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, signInWithGoogle, signInWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Signed in successfully");
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google successfully");
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      await signInWithMicrosoft();
      toast.success("Signed in with Microsoft successfully");
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="emmerce Logo" width="64" height="64" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">emmerce</h2>
        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button 
            onClick={handleMicrosoftSignIn}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#2F2F2F] rounded-md hover:bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F2F2F]"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 0H0V11.5H11.5V0Z" fill="#F25022"/>
              <path d="M23 0H11.5V11.5H23V0Z" fill="#7FBA00"/>
              <path d="M11.5 11.5H0V23H11.5V11.5Z" fill="#00A4EF"/>
              <path d="M23 11.5H11.5V23H23V11.5Z" fill="#FFB900"/>
            </svg>
            Continue with Microsoft
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="px-2 bg-white text-sm text-gray-500">or</span>
        </div>
        <form onSubmit={handleSignIn} className="mt-6">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Log in
          </button>
        </form>
        {error && <p className="mt-4 text-xs text-red-500">{error}</p>}
        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-blue-600 hover:underline">Reset password</a>
        </div>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">No account? </span>
          <button onClick={() => navigate('/signup')} className="text-sm text-blue-600 hover:underline">Create one</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;