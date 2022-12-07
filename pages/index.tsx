import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Rating } from '@mui/material';
import { SiNike } from 'react-icons/si';
import ThankYou from '../components/thankyou';

const Post = () => {
	const router = useRouter();
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
	const onSubmit = async (e: any) => {
		e.preventDefault();
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
		<form onSubmit={onSubmit}>
			<div className="container">
				<label htmlFor="user">Name</label>
				<input
					type="text"
					name="user"
					value={content.user}
					onChange={onChange}
				/>
				<label htmlFor="tech">Tech</label>
				<select
					name="tech"
					value={content.tech}
					onChange={onChange}
					defaultValue="none"
				>
					<option value="none">Select</option>
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
				<label htmlFor="rating">Tech Rating</label>
				<Rating
					name="rating"
					value={content.rating}
					onChange={onChange}
					icon={<SiNike fontSize="inherit" />}
				/>
				{!submitted ? <button type="submit">POST</button> : <ThankYou />}
			</div>
		</form>
	);
};

export default Post;
