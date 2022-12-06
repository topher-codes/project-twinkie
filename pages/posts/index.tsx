import Link from 'next/link';
import db from '../../lib/db';

const Posts = (props: any) => {
	const { entriesData } = props;

	return (
		<div>
			<h1>Posts</h1>
			{entriesData.map((entry: any) => (
				<div key={entry.id}>
					<Link href={`/posts/${entry.slug}`}>
						<p>{entry.title}</p>
					</Link>
					<br />
				</div>
			))}
		</div>
	);
};

export const getStaticProps = async () => {
	const entries = await db
		.collection('incidents')
		.orderBy('created', 'desc')
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
