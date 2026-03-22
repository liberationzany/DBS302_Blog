import {useEffect, useState} from 'react';
import {supabase} from '@site/src/lib/supabaseClient';

type User = {id: string; email: string | null} | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const {
        data: {session},
      } = await supabase.auth.getSession();
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }

    load();

    const {data: listener} = supabase.auth.onAuthStateChange((_, session) => {
      if (mounted) setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return {user, loading, signOut};
}
