import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.username === username)) {
        toast.error('Username already exists');
        return;
      }
      const newUser = { username, password }; // In real app, hash password
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('token', btoa(username)); // Fake token for new user
      localStorage.setItem('username', username);
      login(btoa(username), username);
      toast.success('Sign up successful! Welcome!');
      navigate('/');
    } catch (error) {
      toast.error('Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className='lg:min-h-screen flex items-center justify-center lg:px-17.5 p-10 lg:py-20 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)]'>
        <h1 className='lg:text-3xl text-2xl font-extrabold text-center mb-8'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-sm font-semibold mb-2'>Username</label>
            <input
              type='text'
              value={username}
              onChange={handleUsernameChange}
              className='w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500'
              placeholder='Choose username'
            />
          </div>
          <div className='mb-8'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500'
              placeholder='Choose password'
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:opacity-50'
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className='text-center mt-6 text-sm'>
          Have an account? {' '}
          <Link to='/signin' className='text-black underline font-semibold'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
