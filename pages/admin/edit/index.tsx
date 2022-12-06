import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const List = () => {
	const [entries, setEntries] = useState([]);
	useEffect(async () => {
		const res = await axios.get('/api/entries');
		setEntries(res.data.entriesData);
	}, []);

	return (
		<div>
			<h1>Entries</h1>
			{entries.map((entry: any) => (
				<div key={entry.id}>
					<Link href={`/admin/edit/${entry.id}`}>
						<a>{entry.title}</a>
					</Link>
					<br />
				</div>
			))}
		</div>
	);
};

export default List;
