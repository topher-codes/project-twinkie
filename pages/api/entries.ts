/* eslint-disable import/no-anonymous-default-export */
import db from '../../lib/db';

export default async (req: any, res: any) => {
	try {
		const entries = await db.collection('incidents').orderBy('created').get();
		const entriesData = entries.docs.map((entry) => ({
			id: entry.id,
			...entry.data(),
		}));
		res.status(200).json({ entriesData });
	} catch (e) {
		res.status(400).end();
	}
};
