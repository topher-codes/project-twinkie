import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Post = () => {
	const [content, setContent] = useState({
		user: undefined,
		email: undefined,
		issue: undefined,
		body: undefined,
	});
	const [submitted, setSubmitted] = useState(false);
	const onChange = (e: any) => {
		const { value, name } = e.target;
		setContent((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSubmit = async () => {
		const { user, email, issue, body }: any = content;
		await axios.post('/api/entry', {
			user,
			email,
			issue,
			slug: dashify(user),
			body,
		});
		setSubmitted(true);
	};
	return (
		<div className="container">
			<label htmlFor="user">Name</label>
			<input type="text" name="user" value={content.user} onChange={onChange} />

			<label htmlFor="email">Email</label>
			<input
				type="text"
				name="email"
				value={content.email}
				onChange={onChange}
			/>
			<label htmlFor="title">Issue</label>
			<input
				type="text"
				name="issue"
				value={content.issue}
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
