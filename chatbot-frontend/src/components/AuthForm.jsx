import { use } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: type === 'register' ? '' : undefined
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = 'https://chatbot-weapp.onrender.com';
    try {
        const result = await fetch(`${URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),  // Pass formData here instead of 'result'
        });
        
        const data = await result.json();
        console.log(data);

        if (result.ok) {  // Use 'result' here instead of 'response'
            localStorage.setItem('chatbot-currentUser', JSON.stringify(data));
            alert('Welcome! You are successfully registered as Admin');
            navigate('/chat');
        } else {
            alert('Signup failed. Please check your details and try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        setError('An error occurred. Please try again later.');
    }
};

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
      
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="btn primary">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      
      <div className="auth-footer">
        {type === 'login' ? (
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        ) : (
          <p>Already have an account? <Link to="/login">Login</Link></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
