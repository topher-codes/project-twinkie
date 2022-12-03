export default function Home({ res }: any) {
	return (
		<div className="container">
			<h1>Home</h1>
			<form>
				<FormInput type="text" placeholder="Look at me!" label="First Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Second Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Third Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Fourth Thing" />
			</form>
			{res.response}
		</div>
	);
}

function FormInput(props: any) {
	return (
		<div>
			{props.label}
			<input
				type={props.type}
				className="form-input"
				placeholder={props.placeholder}
			/>
		</div>
	);
}

export async function getStaticProps() {
	const data = await fetch('http://localhost:3000/api/hello');
	const json = await data.json();

	return {
		props: {
			res: json,
		},
	};
}
