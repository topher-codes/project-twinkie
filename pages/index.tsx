import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import { Rating } from '@mui/material';
import { SiNike } from 'react-icons/si';

const Post = () => {
	const [content, setContent] = useState({
		user: undefined,
		email: undefined,
		tech: undefined,
		issue: undefined,
		body: undefined,
		rating: undefined,
	});
	const [submitted, setSubmitted] = useState(false);
	const onChange = (e: any) => {
		const { value, name } = e.target;
		setContent((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSubmit = async () => {
		const { user, email, tech, issue, body, rating }: any = content;
		await axios.post('/api/entry', {
			user,
			tech,
			email,
			issue,
			slug: dashify(user),
			body,
			rating,
		});
		setSubmitted(true);
	};
	return (
		<div className="container">
			<label htmlFor="user">Name</label>
			<input type="text" name="user" value={content.user} onChange={onChange} />
			<label htmlFor="tech">Tech</label>
			<select name="tech" value={content.tech} onChange={onChange}>
				<option value="topher">Topher</option>
				<option value="tyler">Tyler</option>
			</select>
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
			<label htmlFor="body">Detailed Description</label>
			<textarea name="body" value={content.body} onChange={onChange} />

			<label htmlFor="simple-controlled">Tech Rating</label>
			<Rating
				name="simple-controlled"
				value={content.rating}
				onChange={onChange}
				icon={<SiNike fontSize="inherit" />}
			/>

			{!submitted ? (
				<button onClick={onSubmit}>POST</button>
			) : (
				<button>Thanks!</button>
			)}
		</div>
	);
};

export default Post;
