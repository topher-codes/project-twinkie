import { auth, collection, db, getDocs } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
	const user = useAuthState(auth);
	const [username, setUsername] = useState(undefined);

	useEffect(() => {
		// turn off realtime subscription
		let unsubscribe;

		if (user) {
			setUsername(undefined);
		}

		return unsubscribe;
	}, [user]);

	return { user, username };
}
