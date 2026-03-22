import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {supabase} from '@site/src/lib/supabaseClient';

export default function LoginPage(): ReactNode {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get('token_hash');
    const type = params.get('type');

    if (!token_hash) {
      return;
    }

    setVerifying(true);
    supabase.auth
      .verifyOtp({ token_hash, type: (type as 'email') || 'email' })
      .then(({ error }) => {
        if (error) {
          setError(error.message);
        } else {
          setInfo('Verification successful! You are now logged in.');
          window.history.replaceState({}, document.title, '/login');
        }
      })
      .finally(() => setVerifying(false));
  }, []);

  const handleMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email) {
      setError('Enter your email to receive a magic link.');
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError('Supabase is not configured. Check env variables.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setError(error.message || 'Magic link request failed.');
    } else {
      setInfo('Check your email for the login link.');
    }

    setLoading(false);
  };

  return (
    <Layout title="Login" description="Log in to DBS Blog">
      <main style={{ padding: '3rem', maxWidth: 620, margin: '0 auto' }}>
        <h1>Log In with Magic Link</h1>
        <p>Enter your email and click "Send login link". Then follow the link in your inbox.</p>

        {verifying && <div className="alert alert--success" style={{ marginBottom: '1rem' }}>Confirming token...</div>}
        {error && <div className="alert alert--danger" style={{ marginBottom: '1rem' }}>{error}</div>}
        {info && <div className="alert alert--info" style={{ marginBottom: '1rem' }}>{info}</div>}

        <form onSubmit={handleMagicLink}>
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

          <button className="button button--primary" type="submit" style={{ width: '100%' }} disabled={loading || verifying}>
            {loading ? 'Sending link...' : 'Send login link'}
          </button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Or sign in with password: <Link to="/login-password">Password login</Link> (if implemented).
        </p>

        <p style={{ marginTop: '0.5rem' }}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    </Layout>
  );
}
