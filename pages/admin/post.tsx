import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Post = () => {
	const [content, setContent] = useState({
		user: undefined,
		title: undefined,
		body: undefined,
	});
	const [submitted, setSubmitted] = useState(false);
	const onChange = (e: any) => {
		const { value, name } = e.target;
		setContent((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSubmit = async () => {
		const { user, title, body }: any = content;
		await axios.post('/api/entry', { user, title, slug: dashify(title), body });
		setSubmitted(true);
	};
	return (
		<div className="container">
			<label htmlFor="title">Name</label>
			<input type="text" name="user" value={content.user} onChange={onChange} />
			<label htmlFor="title">Title</label>
			<input
				type="text"
				name="title"
				value={content.title}
				onChange={onChange}
			/>
			<label htmlFor="body">Body</label>
			<textarea name="body" value={content.body} onChange={onChange} />
			{!submitted ? (
				<button onClick={onSubmit}>POST</button>
			) : (
				<button>Thanks!</button>
			)}
		</div>
	);
};

export default Post;
