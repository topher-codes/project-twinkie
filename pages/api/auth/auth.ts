import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../../lib/firebase';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password } = req.body;
	const auth = getAuth(app);
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		res.status(200).json({ user });
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		res.status(400).json({ errorCode, errorMessage });
	}
}
