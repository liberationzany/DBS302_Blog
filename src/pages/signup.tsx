import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {supabase} from '@site/src/lib/supabaseClient';

export default function SignupPage(): ReactNode {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Enter both email and password');
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError('Supabase is not configured. Check SUPABASE_URL and SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message || 'Sign up failed.');
      setLoading(false);
      return;
    }

    setInfo(`Sign-up successful. User: ${JSON.stringify(data?.user || data?.session || data, null, 2)}`);

    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/blog';
      }, 1200);
    }

    setLoading(false);
  };

  return (
    <Layout title="Sign Up" description="Create an account for DBS Blog">
      <main style={{ padding: '3rem', maxWidth: 620, margin: '0 auto' }}>
        <h1>Sign Up</h1>
        <p>Create your account to publish and manage your posts.</p>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: 8 }} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
              placeholder="you@example.com"
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: 8 }} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="alert alert--danger" style={{ marginBottom: '1rem' }}>{error}</div>}
          {info && <div className="alert alert--info" style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{info}</div>}

          <button className="button button--primary" type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          </form>

        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </main>
    </Layout>
  );
}
