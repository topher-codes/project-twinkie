/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/db';

export default async (req: any, res: any) => {
	try {
		const { slug } = req.body;
		const entries = await db.collection('incidents').get();
		const entriesData = entries.docs.map((entry) => entry.data());

		if (entriesData.some((entry) => entry.slug === slug)) {
			res.status(400).end();
		} else {
			const { id } = await db.collection('incidents').add({
				...req.body,
				created: new Date().toISOString(),
			});
			res.status(200).json({ id });
		}
	} catch (e) {
		res.status(400).end();
	}
};
