import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Posts: NextPage = (props: any) => {
	const router = useRouter();
	const { entriesData } = props;
	const [tech, setTech] = useState({
		tech: undefined,
	});

	const onChange = (e: any) => {
		const { value, name } = e.target;
		setTech((prevState) => ({ ...prevState, [name]: value }));
		console.log(tech.tech);
	};

	const deleteBtn = async (id: any) => {
		await deleteDoc(doc(db, 'incidents', id));
		window.location.reload();
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
							{entry.user}
							<p>{new Date(entry.created).toLocaleString()}</p>
						</Link>
						<p>
							<button onClick={() => deleteBtn(entry.id)}>Delete</button>
						</p>
					</div>
				))}
		</div>
	);
};

export const getStaticProps = async () => {
	const entries = await collection(db, 'incidents');
	const entriesSnapshot = await getDocs(entries);
	const entriesData = entriesSnapshot.docs.map((entry: any) => ({
		id: entry.id,
		...entry.data(),
	}));
	return {
		props: { entriesData },
		revalidate: 2,
	};
};

export default Posts;
