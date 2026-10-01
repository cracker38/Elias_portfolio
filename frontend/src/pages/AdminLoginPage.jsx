import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AdminLoginPage() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/admin" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    setLoading(true);
    setError('');
    try {
      await login(form.get('email'), form.get('password'));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ maxWidth: 480, padding: '80px 0' }}>
      <p className="eyebrow">Admin</p>
      <h1>Sign in</h1>
      <form className="form form-card" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required minLength={8} />
        </label>
        {error ? <div className="alert error">{error}</div> : null}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
