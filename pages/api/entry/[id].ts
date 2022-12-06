/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/db';

export default async (req: any, res: any) => {
	const { id } = req.query;

	try {
		if (req.method === 'PUT') {
			await db
				.collection('incidents')
				.doc(id)
				.update({
					...req.body,
					updated: new Date().toISOString(),
				});
		} else if (req.method === 'GET') {
			const doc = await db.collection('incidents').doc(id).get();
			if (!doc.exists) {
				res.status(404).end();
			} else {
				res.status(200).json(doc.data());
			}
		} else if (req.method === 'DELETE') {
			await db.collection('incidents').doc(id).delete();
		}
		res.status(200).end();
	} catch (e) {
		res.status(400).end();
	}
};
