import Link from 'next/link';
import db from '../../lib/db';
import entries from '../api/entries';
import { useState } from 'react';

const Posts = (props: any) => {
	const { entriesData } = props;
	const [tech, setTech] = useState({
		tech: undefined,
	});

	const onChange = (e: any) => {
		const { value, name } = e.target;
		setTech((prevState) => ({ ...prevState, [name]: value }));
		console.log(tech.tech);
	};

	return (
		<div className="container">
			<h1>Total Submissions: {entriesData.length}</h1>
			<label htmlFor="tyler">Tyler</label>
			<input
				type="radio"
				name="tech"
				value="tyler"
				id="tyler"
				onChange={onChange}
			/>
			<label htmlFor="topher">Topher</label>
			<input
				type="radio"
				name="tech"
				value="topher"
				id="topher"
				onChange={onChange}
			/>
			<label htmlFor="topher">Erik</label>
			<input
				type="radio"
				name="tech"
				value="erik"
				id="erik"
				onChange={onChange}
			/>
			{entriesData
				.filter((entry: any) => entry.tech == tech.tech)
				.map((entry: any) => (
					<div key={entry.id} className="card">
						<Link href={`/posts/${entry.slug}`}>
							{entry.id}
							<p>{new Date(entry.created).toLocaleString()}</p>
						</Link>
					</div>
				))}
		</div>
	);
};

export const getStaticProps = async () => {
	const entries = await db.collection('incidents').get();
	const entriesData = entries.docs.map((entry) => ({
		id: entry.id,
		...entry.data(),
	}));
	return {
		props: { entriesData },
		revalidate: 10,
	};
};

export default Posts;
