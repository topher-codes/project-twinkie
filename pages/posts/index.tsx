import Link from 'next/link';
import db from '../../lib/db';
import entries from '../api/entries';

const Posts = (props: any) => {
	const { entriesData } = props;

	return (
		<div className="container">
			<h1>Posts: {entriesData.length}</h1>
			{entriesData.map((entry: any) => (
				<div key={entry.id}>
					<Link href={`/posts/${entry.slug}`}>{entry.id}</Link>
				</div>
			))}
		</div>
	);
};

export const getStaticProps = async () => {
	const entries = await db
		.collection('incidents')
		.where('tech', '==', 'tyler')
		.get();
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
