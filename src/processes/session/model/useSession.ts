import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../../../shared/api/firebase';

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, nextUser => {
      setUser(nextUser);
      setInitializing(false);
    });

    return unsub;
  }, []);

  return { user, initializing };
}
