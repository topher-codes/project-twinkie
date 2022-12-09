/* eslint-disable import/no-anonymous-default-export */
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { user } = req.body;
		const incidents = await collection(db, 'incidents');
		const incidentsRef = await getDocs(incidents);
		const incidentsData = incidentsRef.docs.map((doc) => doc.data());
		if (incidentsData.some((entry) => entry.user === user)) {
			res.status(400).end();
		} else {
			const { id } = await addDoc(incidents, {
				...req.body,
				created: new Date().toISOString(),
			});
			res.status(200).json({ id });
		}
	} catch (e) {
		res.status(400).end();
	}
};
